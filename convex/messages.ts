import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { internal } from "./_generated/api";

export const list = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

export const send = mutation({
  args: {
    message: v.string(),
    sessionId: v.string(),
  },
  handler: async (ctx, { message, sessionId }) => {
    // Add timestamp to ensure correct ordering
    const timestamp = Date.now();
    
    // Store the user message
    const userMessageId = await ctx.db.insert("messages", {
      isUser: true, // Use isUser flag to identify user messages
      text: message,
      sessionId,
      timestamp,
    });
    
    // Create a placeholder for the AI response with streaming flag
    const streamingMessageId = await ctx.db.insert("messages", {
      isUser: false, // AI messages have isUser: false
      text: "",
      sessionId,
      timestamp: timestamp + 1, // Ensure it appears after user message
      isStreaming: true, // Mark as streaming
    });
    
    // Start generating the response asynchronously - pass userMessageId to prevent duplication
    await ctx.scheduler.runAfter(0, internal.serve.answerStreaming, { // Use answerStreaming directly
      sessionId,
      text: message,
      streamingMessageId,
      userMessageId, // Pass this to prevent creating duplicate user message
    });
    
    return streamingMessageId;
  },
});

export const clear = mutation({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
  },
});
