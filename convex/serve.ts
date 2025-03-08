/* eslint-disable no-constant-condition */
import { OpenAI } from "openai";
import { sleep } from "modern-async";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import {
  ActionCtx,
  MutationCtx,
  QueryCtx,
  internalAction,
  internalMutation,
  internalQuery,
  action,
} from "./_generated/server";

// Constants for streaming configuration
// Reduce delay between chunk updates to make streaming appear more responsive
const STREAM_DELAY_MS = 0; 

// Get environment variables from process.env directly
function getEnvironmentVariables() {
  return {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ASSISTANT_ID: process.env.ASSISTANT_ID,
  };
}

export const terminalTest = internalAction({
  args: {
    message: v.string(),
    apiKey: v.optional(v.string()),
    assistantId: v.optional(v.string()),
  },
  handler: async (ctx: ActionCtx, args: any) => {
    try {
      const testSessionId = "terminal-test-session";
      // Use the provided API key if available, otherwise fall back to environment variable
      const env = getEnvironmentVariables();
      const apiKey = env.OPENAI_API_KEY || args.apiKey;
      let assistantId = env.ASSISTANT_ID || args.assistantId;
      
      const openai = new OpenAI({
        apiKey: apiKey,
        defaultHeaders: {
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      
      // Get or create a thread
      const threadId = await getOrCreateThread(ctx, openai, testSessionId);
      
      // Add the user message
      await openai.beta.threads.messages.create(
        threadId,
        { role: "user", content: args.message }
      );
      
      // Run the assistant
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId || "",
      });
      
      // Poll for completion
      let response = "No response received";
      let completed = false;
      const startTime = Date.now();
      
      while (!completed && Date.now() - startTime < 30000) {
        await sleep(1000);
        const runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
        
        if (runStatus.status === "completed") {
          const messages = await openai.beta.threads.messages.list(threadId);
          const assistantMessages = messages.data.filter(msg => msg.role === "assistant");
          
          if (assistantMessages.length > 0) {
            const latestMessage = assistantMessages[0];
            let text = "";
            
            // Extract content using the safe pattern from the memory
            if (latestMessage.content && Array.isArray(latestMessage.content)) {
              text = latestMessage.content
                .filter(item => item.type === "text")
                .map(item => {
                  // Type assertion and safe access as mentioned in the memory
                  return item.type === "text" ? (item as any).text?.value || "" : "";
                })
                .join("\n");
            }
            
            response = text;
          }
          completed = true;
        } else if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
          response = `Error: Run ${runStatus.status}`;
          completed = true;
        }
      }
      
      return { success: true, message: args.message, response };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }
});

export const answer = internalAction({
  args: {
    sessionId: v.string(),
    text: v.string(),
    streamingMessageId: v.optional(v.string()),
    userMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx: ActionCtx, args: { 
    sessionId: string; 
    text: string; 
    streamingMessageId?: string; 
    userMessageId?: any; 
  }): Promise<any> => {
    console.log("answer called, forwarding to streaming implementation");
    // Forward all requests to the streaming implementation
    return await ctx.runAction(internal.serve.answerStreaming, args);
  },
});

async function getOrCreateThread(
  ctx: ActionCtx,
  openai: OpenAI,
  sessionId: string
): Promise<string> {
  // Try to find existing thread
  const existingThread = await ctx.runQuery(internal.serve.getThread, {
    sessionId,
  });

  if (existingThread) {
    return existingThread;
  }

  // Create a new thread if one doesn't exist
  const thread = await openai.beta.threads.create();
  
  // Store the thread ID
  await ctx.runMutation(internal.serve.storeThread, {
    sessionId,
    threadId: thread.id,
  });

  return thread.id;
}

export const getThread = internalQuery(
  async (ctx: QueryCtx, { sessionId }: { sessionId: string }) => {
    return await ctx.db
      .query("threads")
      .withIndex("bySessionId", (q) => q.eq("sessionId", sessionId))
      .first()
      ?.then((thread) => thread?.threadId);
  }
);

export const storeThread = internalMutation(
  async (
    ctx: MutationCtx,
    { sessionId, threadId }: { sessionId: string; threadId: string }
  ) => {
    await ctx.db.insert("threads", { sessionId, threadId });
  }
);

export const answerStreaming = internalAction({
  args: {
    sessionId: v.string(),
    text: v.string(),
    streamingMessageId: v.optional(v.string()),
    userMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx: ActionCtx, args) => {
    const { sessionId, text, streamingMessageId, userMessageId } = args;
    const env = getEnvironmentVariables();
    
    console.log("Environment variables loaded for streaming:", 
      env.OPENAI_API_KEY ? "OPENAI_API_KEY is present" : "OPENAI_API_KEY is missing",
      env.ASSISTANT_ID ? "ASSISTANT_ID is present" : "ASSISTANT_ID is missing",
      "userMessageId:", userMessageId ? "present" : "not provided"
    );
    
    try {
      // Use the environment variables
      const apiKey = env.OPENAI_API_KEY;
      const assistantId = env.ASSISTANT_ID;
      
      if (!apiKey) {
        throw new Error("Missing OPENAI_API_KEY environment variable");
      }
      
      if (!assistantId) {
        throw new Error("Missing ASSISTANT_ID environment variable");
      }
      
      console.log("Using Assistant ID for streaming:", assistantId);
      
      const openai = new OpenAI({
        apiKey: apiKey,
        defaultHeaders: {
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      
      // Use provided streamingMessageId or create a new one if not provided
      let activeStreamingMessageId = streamingMessageId;
      if (!activeStreamingMessageId) {
        activeStreamingMessageId = await ctx.runMutation(internal.serve.createStreamingMessage, {
          sessionId,
        });
      }
      
      // Update the session timestamp
      await ctx.runMutation(internal.sessions.updateSession, {
        sessionId,
        status: "active",
        updatedAt: Date.now()
      });
      
      // Get or create thread
      const threadId = await getOrCreateThread(ctx, openai, sessionId);
      console.log("Thread ID for streaming:", threadId);
      
      // Add user message to thread - but don't create duplicate in our db
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: text,
      });
      
      // Run the assistant with streaming enabled
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        stream: true,
      });
      
      console.log("Run started with streaming");
      
      // Start streaming response back to client
      let accumulatedMessage = "";
      
      // Process the stream
      for await (const chunk of run) {
        if (chunk.event === "thread.message.delta" && chunk.data?.delta?.content) {
          for (const item of chunk.data.delta.content) {
            if (item.type === 'text' && item.text?.value) {
              // Append the new text from the chunk
              accumulatedMessage += item.text.value;
              
              // Update on every chunk for maximum smoothness
              // Without any character count threshold
              if (activeStreamingMessageId) {
                await ctx.runMutation(internal.serve.updateStreamingMessage, {
                  messageId: typeof activeStreamingMessageId === 'string' 
                    ? convertToMessageId(activeStreamingMessageId)
                    : activeStreamingMessageId,
                  text: accumulatedMessage,
                  isComplete: false,
                });
                
                // No delay between updates for real-time streaming feel
                if (STREAM_DELAY_MS > 0) {
                  await sleep(STREAM_DELAY_MS);
                }
              }
            }
          }
        }
        
        // Check if the run has completed
        if (chunk.event === "thread.run.completed") {
          console.log("Run completed");
          
          // Save final complete message
          if (activeStreamingMessageId) {
            await ctx.runMutation(internal.serve.updateStreamingMessage, {
              messageId: typeof activeStreamingMessageId === 'string' 
                ? convertToMessageId(activeStreamingMessageId)
                : activeStreamingMessageId,
              text: accumulatedMessage,
              isComplete: true,
            });
          }
          break;
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error in answerStreaming:", error);
      
      // Save an error message to be displayed to the user
      await ctx.runMutation(internal.serve.addMessage, {
        sessionId,
        text: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}. Please try again.`,
        isUser: false,
      });
      
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  },
});

// Helper to convert string to ID
function convertToMessageId(idString: string): any {
  return idString as any; // This is a temporary workaround for TypeScript errors
}

// Create initial empty message for streaming
export const createStreamingMessage = internalMutation({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx: MutationCtx, { sessionId }) => {
    return await ctx.db.insert("messages", {
      sessionId,
      text: "",
      isUser: false,
      timestamp: Date.now(),
      isStreaming: true,
    });
  },
});

// Update streaming message with new content
export const updateStreamingMessage = internalMutation({
  args: {
    messageId: v.id("messages"),
    text: v.string(),
    isComplete: v.boolean(),
  },
  handler: async (ctx: MutationCtx, { messageId, text, isComplete }) => {
    if (isComplete) {
      // If complete, remove the streaming flag
      await ctx.db.patch(messageId, {
        text,
        isStreaming: false,
      });
    } else {
      // Just update the text
      await ctx.db.patch(messageId, {
        text,
      });
    }
    
    return messageId;
  },
});

// Helper function to add a message
export const addMessage = internalMutation({
  args: {
    sessionId: v.string(),
    text: v.string(),
    isUser: v.optional(v.boolean()),
  },
  handler: async (ctx: MutationCtx, { sessionId, text, isUser = false }) => {
    if (text.trim() === "") {
      return;
    }
    return await ctx.db.insert("messages", {
      sessionId,
      text,
      isUser: isUser ?? false,
      timestamp: Date.now(),
    });
  }
});

// Get session database ID from session string ID
export const getSessionDbId = internalQuery({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx: QueryCtx, { sessionId }) => {
    return await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("_id"), sessionId))
      .first();
  },
});

// Public wrapper for the terminalTest function that can be called from client code
export const publicTerminalTest = action({
  args: {
    message: v.string(),
    apiKey: v.optional(v.string()),
    assistantId: v.optional(v.string()),
  },
  handler: async (ctx: ActionCtx, args: any): Promise<{
    success: boolean;
    message?: string;
    response?: string;
    error?: string;
  }> => {
    return await ctx.runAction(internal.serve.terminalTest, args);
  },
});
