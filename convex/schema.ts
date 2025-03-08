import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    url: v.string(),
    text: v.string(),
    fileId: v.union(v.string(), v.null()),
  }).index("byUrl", ["url"]),
  
  messages: defineTable({
    sessionId: v.string(),
    text: v.string(),
    isUser: v.optional(v.boolean()),
    isViewer: v.optional(v.boolean()), // Add isViewer for backward compatibility
    timestamp: v.optional(v.number()), // Add timestamp for message ordering
    isStreaming: v.optional(v.boolean()), // Flag for streaming messages
  }).index("bySessionId", ["sessionId"]),
  
  threads: defineTable({
    sessionId: v.string(),
    threadId: v.string(),
  }).index("bySessionId", ["sessionId"]),
  
  desks: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    features: v.array(v.string()),
    categoryId: v.id("deskCategories"),
    imageUrl: v.optional(v.string()),
    inStock: v.boolean(),
  }).index("byCategory", ["categoryId"]),
  
  deskCategories: defineTable({
    name: v.string(),
    description: v.string(),
  }),
  
  faqItems: defineTable({
    question: v.string(),
    answer: v.string(),
    categoryId: v.optional(v.id("deskCategories")),
  }).index("byCategory", ["categoryId"]),
  
  sessions: defineTable({
    name: v.optional(v.string()), // Optional name for the session
    createdAt: v.number(), // When the session was created
    updatedAt: v.number(), // Last message timestamp
    status: v.string(), // "active" or "ended"
    summary: v.optional(v.string()), // Optional summary of the conversation
  }),
});
