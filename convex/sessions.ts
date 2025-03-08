import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// Create a new chat session
export const createSession = mutation({
  args: {
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const sessionId = await ctx.db.insert("sessions", {
      name: args.name,
      createdAt: now,
      updatedAt: now,
      status: "active",
    });
    
    return { sessionId: sessionId };
  },
});

// Get all chat sessions
export const getAllSessions = query({
  handler: async (ctx) => {
    const sessions = await ctx.db
      .query("sessions")
      .collect();
    
    // Sort by updatedAt descending in memory instead of using .order
    return sessions.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  },
});

// End a chat session
export const endSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    summary: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      status: "ended",
      updatedAt: Date.now(),
      summary: args.summary,
    });
    
    return { success: true };
  },
});

// Get messages for a specific session
export const getSessionMessages = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    
    // Sort by timestamp ascending in memory instead of using .order
    return messages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  },
});

// Update session timestamp when new messages are added
export const updateSessionTimestamp = mutation({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      updatedAt: Date.now(),
    });
  },
});

// Update a session's status and timestamp
export const updateSession = internalMutation({
  args: {
    sessionId: v.string(),
    status: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { sessionId, status, updatedAt } = args;
    
    // Find the session by sessionId
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("_id"), sessionId))
      .first();
    
    if (session) {
      // Update the session with new values
      const updateData: any = {};
      
      if (status) {
        updateData.status = status;
      }
      
      if (updatedAt) {
        updateData.updatedAt = updatedAt;
      } else {
        updateData.updatedAt = Date.now();
      }
      
      await ctx.db.patch(session._id, updateData);
      return session._id;
    }
    
    return null;
  },
});
