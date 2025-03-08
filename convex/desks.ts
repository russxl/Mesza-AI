import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * Get all desk categories.
 */
export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("deskCategories").collect();
  },
});

/**
 * Get all desks, optionally filtered by category.
 */
export const listDesks = query({
  args: {
    categoryId: v.optional(v.id("deskCategories")),
  },
  handler: async (ctx, args) => {
    if (args.categoryId !== undefined) {
      const categoryId = args.categoryId; // Store in a const to help TypeScript with type narrowing
      return await ctx.db
        .query("desks")
        .withIndex("byCategory", (q) => q.eq("categoryId", categoryId))
        .collect();
    } else {
      return await ctx.db.query("desks").collect();
    }
  },
});

/**
 * Get a specific desk by ID.
 */
export const getDeskById = query({
  args: {
    deskId: v.id("desks"),
  },
  handler: async (ctx, args) => {
    const desk = await ctx.db.get(args.deskId);
    
    if (!desk) {
      throw new Error(`Desk with ID ${args.deskId} not found`);
    }
    
    // Get the category data if categoryId exists
    let category = undefined;
    if (desk.categoryId) {
      category = await ctx.db.get(desk.categoryId);
    }
    
    return {
      ...desk,
      category,
    };
  },
});

/**
 * Create a new desk category.
 */
export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const categoryId = await ctx.db.insert("deskCategories", {
      name: args.name,
      description: args.description,
    });
    
    return categoryId;
  },
});

/**
 * Update an existing desk category.
 */
export const updateCategory = mutation({
  args: {
    categoryId: v.id("deskCategories"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { categoryId, ...updateFields } = args;
    
    // Only update fields that were provided
    const category = await ctx.db.get(categoryId);
    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }
    
    await ctx.db.patch(categoryId, updateFields);
    
    return categoryId;
  },
});

/**
 * Create a new desk.
 */
export const createDesk = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    categoryId: v.id("deskCategories"),
    price: v.number(),
    features: v.array(v.string()),
    imageUrl: v.optional(v.string()),
    inStock: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Make sure the category exists
    const category = await ctx.db.get(args.categoryId);
    if (!category) {
      throw new Error(`Category with ID ${args.categoryId} not found`);
    }
    
    const deskId = await ctx.db.insert("desks", {
      name: args.name,
      description: args.description,
      categoryId: args.categoryId,
      price: args.price,
      features: args.features,
      imageUrl: args.imageUrl || "/placeholder-desk.jpg", // Default image
      inStock: args.inStock !== undefined ? args.inStock : true, // Default to in stock
    });
    
    return deskId;
  },
});

/**
 * Update an existing desk.
 */
export const updateDesk = mutation({
  args: {
    deskId: v.id("desks"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    categoryId: v.optional(v.id("deskCategories")),
    price: v.optional(v.number()),
    features: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
    inStock: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { deskId, ...updateFields } = args;
    
    // Make sure the desk exists
    const desk = await ctx.db.get(deskId);
    if (!desk) {
      throw new Error(`Desk with ID ${deskId} not found`);
    }
    
    // If categoryId is provided, make sure it exists
    if (updateFields.categoryId) {
      const category = await ctx.db.get(updateFields.categoryId);
      if (!category) {
        throw new Error(`Category with ID ${updateFields.categoryId} not found`);
      }
    }
    
    await ctx.db.patch(deskId, updateFields);
    
    return deskId;
  },
});

/**
 * Get all FAQ items, optionally filtered by category.
 */
export const listFaqs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("faqItems").collect();
  },
});

/**
 * Create a new FAQ item.
 */
export const createFaq = mutation({
  args: {
    question: v.string(),
    answer: v.string(),
    categoryId: v.optional(v.id("deskCategories")),
  },
  handler: async (ctx, args) => {
    // If categoryId is provided, make sure it exists
    if (args.categoryId) {
      const category = await ctx.db.get(args.categoryId);
      if (!category) {
        throw new Error(`Category with ID ${args.categoryId} not found`);
      }
    }
    
    const faqId = await ctx.db.insert("faqItems", {
      question: args.question,
      answer: args.answer,
      categoryId: args.categoryId,
    });
    
    return faqId;
  },
});
