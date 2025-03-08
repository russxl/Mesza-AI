import { v } from "convex/values";
import { OpenAI } from "openai";
import { internal } from "./_generated/api";
import {
  ActionCtx,
  internalAction,
  internalMutation,
  internalQuery,
  query,
  mutation,
} from "./_generated/server";

// Query to get all messages for a session
export const getMessages = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .order("asc")
      .collect();
  },
});

// Mutation to send a message from the user
export const sendMessage = mutation({
  args: { 
    message: v.string(),
    sessionId: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      sessionId: args.sessionId,
      text: args.message,
      isUser: true,
      timestamp: Date.now(),
    });
    
    // Schedule the bot to respond
    await ctx.scheduler.runAfter(0, internal.deskChatbot.generateDeskResponse, {
      sessionId: args.sessionId,
      message: args.message,
    });
    
    return null;
  },
});

// Clear messages for a session
export const clearChat = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    
    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
    
    // Also delete the associated thread if exists
    const thread = await ctx.db
      .query("threads")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .unique();
    
    if (thread) {
      await ctx.db.delete(thread._id);
    }
    
    return null;
  },
});

// Internal action to generate a desk-specific response
export const generateDeskResponse = internalAction({
  args: {
    sessionId: v.string(),
    message: v.string()
  },
  handler: async (ctx, args) => {
    console.log("Starting generateDeskResponse for session:", args.sessionId);
    console.log("User message:", args.message);
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    try {
      const threadId = await getOrCreateThread(ctx, openai, args.sessionId);
      console.log("Got threadId:", threadId);

      // Send the user message to the thread
      console.log("Adding user message to thread...");
      const { id: lastMessageId } = await openai.beta.threads.messages.create(
        threadId,
        { role: "user", content: args.message }
      );
      console.log("Added message with ID:", lastMessageId);

      // Create a run with the standing desk assistant
      console.log("Creating assistant run...");
      const { id: runId } = await openai.beta.threads.runs.create(threadId, {
        assistant_id: process.env.ASSISTANT_ID!,
        instructions: `
                You are a specialized customer service agent for a standing desk company.
                Focus on helping customers find the right standing desk for their needs.
                Key information to provide:
                - Benefits of standing desks (health, productivity, ergonomics)
                - Features to consider (height range, weight capacity, adjustment mechanisms)
                - Desk specifications and customization options
                - Pricing information and current promotions
                - Shipping and warranty details
                - Assembly and setup instructions
                
                Always be helpful, concise, and accurate. If you don't know a specific detail about 
                a product, acknowledge that and offer to connect the customer with a human representative.
              `,
      });
      console.log("Created run with ID:", runId);

      await pollForDeskResponse(ctx, { threadId, sessionId: args.sessionId, lastMessageId, runId });
      console.log("Completed desk response generation");
      return null;
    } catch (error) {
      console.error("Error in generateDeskResponse:", error);
      // Save an error response
      await ctx.runMutation(internal.deskChatbot.saveResponse, {
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sessionId: args.sessionId,
      });
      throw error;
    }
  },
});

// Helper to get or create an OpenAI thread
const getOrCreateThread = async (
  ctx: ActionCtx,
  openai: OpenAI,
  sessionId: string
) => {
  const thread = await ctx.runQuery(internal.deskChatbot.getThreadById, { sessionId });
  if (thread !== null) {
    return thread.threadId;
  }
  const { id: threadId } = await openai.beta.threads.create();
  await ctx.runMutation(internal.deskChatbot.saveThreadId, {
    sessionId,
    threadId,
  });
  return threadId;
};

// Query to get a thread by session ID
export const getThreadById = internalQuery({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("threads")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .unique();
  },
});

// Mutation to save a thread ID
export const saveThreadId = internalMutation({
  args: {
    sessionId: v.string(),
    threadId: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("threads", {
      sessionId: args.sessionId,
      threadId: args.threadId,
    });
    return null;
  },
});

// Poll for the AI's response
async function pollForDeskResponse(
  ctx: ActionCtx,
  args: {
    sessionId: string;
    threadId: string;
    runId: string;
    lastMessageId: string;
  }
) {
  const { sessionId, threadId, runId, lastMessageId } = args;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  console.log("Starting pollForDeskResponse...");
  
  // Poll until we get a complete response
  let attempts = 0;
  const maxAttempts = 60; // About 30 seconds with 500ms intervals
  
  while (attempts < maxAttempts) {
    attempts++;
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Polling attempt ${attempts} for runId: ${runId}`);
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log("Run status:", run.status);
    
    switch (run.status) {
      case "failed":
      case "expired":
      case "cancelled":
        console.log("Run failed or cancelled:", run.status);
        await ctx.runMutation(internal.deskChatbot.saveResponse, {
          text: "I'm sorry, I'm having trouble responding right now. Please try again or contact our support team directly.",
          sessionId,
        });
        return;
        
      case "completed": {
        console.log("Run completed, fetching new messages...");
        // Get all new messages since the last user message
        const { data: newMessages } = await openai.beta.threads.messages.list(
          threadId,
          { after: lastMessageId, order: "asc" }
        );
        
        console.log(`Found ${newMessages.length} new messages from assistant`);
        
        // Process and save each new message
        for (const message of newMessages) {
          let text = "";
          
          // Extract text content from the message
          if (message.content && Array.isArray(message.content)) {
            text = message.content
              .filter(item => item.type === "text")
              .map(item => {
                if (item.type === "text" && item.text) {
                  return item.text.value;
                }
                return "";
              })
              .join("\n\n");
          }
          
          console.log("Saving assistant response:", text.substring(0, 100) + "...");
          await ctx.runMutation(internal.deskChatbot.saveResponse, {
            text,
            sessionId,
          });
        }
        
        if (newMessages.length === 0) {
          console.log("WARNING: No new messages found after completion!");
          await ctx.runMutation(internal.deskChatbot.saveResponse, {
            text: "I'm processing your request but haven't generated a response yet. Please try asking again or rephrase your question.",
            sessionId,
          });
        }
        
        return;
      }
      
      case "requires_action":
        console.log("Run requires action, but we don't support function calling in this implementation");
        await ctx.runMutation(internal.deskChatbot.saveResponse, {
          text: "I'm sorry, I need to perform actions that aren't supported yet. Please contact our support team for assistance.",
          sessionId,
        });
        return;
    }
  }
  
  // If we've reached max attempts and still no completion
  console.log("Reached maximum polling attempts without completion");
  await ctx.runMutation(internal.deskChatbot.saveResponse, {
    text: "I'm sorry, it's taking me longer than expected to process your request. Please try again in a moment.",
    sessionId,
  });
}

// Save a response from the AI
export const saveResponse = internalMutation({
  args: {
    text: v.string(),
    sessionId: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      sessionId: args.sessionId,
      text: args.text,
      isUser: false,
      timestamp: Date.now(),
    });
    return null;
  },
});

// Retrieve relevant desk information to provide context
export const getDeskInfo = internalQuery({
  args: { deskName: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.deskName) {
      // Simple fuzzy search by checking if the deskName is included in any desk name
      const allDesks = await ctx.db.query("desks").collect();
      const matchingDesks = allDesks.filter(desk => 
        desk.name.toLowerCase().includes(args.deskName!.toLowerCase())
      );
      
      if (matchingDesks.length > 0) {
        return matchingDesks;
      }
    }
    
    // Return all desks if no match or no deskName provided
    return await ctx.db.query("desks").collect();
  },
});
