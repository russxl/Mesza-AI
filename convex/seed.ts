import { internalMutation } from "./_generated/server";

/**
 * Seeds the database with initial data for standing desks.
 * Run this function from the Convex dashboard or via a one-time trigger.
 */
export const seedDatabase = internalMutation({
  handler: async (ctx) => {
    // Check if we already have data
    const existingCategories = await ctx.db.query("deskCategories").collect();
    if (existingCategories.length > 0) {
      console.log("Database already seeded. Skipping.");
      return null;
    }
    
    // Create desk categories
    const basicCategoryId = await ctx.db.insert("deskCategories", {
      name: "Basic Standing Desks",
      description: "Affordable and reliable standing desks for everyday use.",
    });
    
    const premiumCategoryId = await ctx.db.insert("deskCategories", {
      name: "Premium Standing Desks",
      description: "High-end standing desks with advanced features and premium materials.",
    });
    
    const converterCategoryId = await ctx.db.insert("deskCategories", {
      name: "Desk Converters",
      description: "Convert your existing desk into a standing desk.",
    });
    
    // Create basic desks
    await ctx.db.insert("desks", {
      name: "EcoStand Basic",
      description: "An affordable entry-level standing desk with manual height adjustment.",
      price: 199.99,
      features: [
        "Manual height adjustment",
        "Weight capacity: 80 lbs",
        "Desktop size: 48\" x 30\"",
        "Eco-friendly bamboo surface",
      ],
      categoryId: basicCategoryId,
      inStock: true,
    });
    
    await ctx.db.insert("desks", {
      name: "EcoStand Pro",
      description: "Our most popular basic electric standing desk with smooth height adjustment.",
      price: 299.99,
      features: [
        "Electric height adjustment",
        "Weight capacity: 150 lbs",
        "Desktop size: 48\" x 30\"",
        "Height range: 28\" to 48\"",
        "3 memory presets",
      ],
      categoryId: basicCategoryId,
      inStock: true,
    });
    
    // Create premium desks
    await ctx.db.insert("desks", {
      name: "ExecutiveStand Elite",
      description: "Premium standing desk with advanced features for the discerning professional.",
      price: 699.99,
      features: [
        "Dual-motor electric height adjustment",
        "Weight capacity: 350 lbs",
        "Desktop size: 60\" x 30\"",
        "Height range: 24\" to 50\"",
        "4 programmable memory presets",
        "Anti-collision technology",
        "Premium hardwood desktop",
        "Cable management system",
      ],
      categoryId: premiumCategoryId,
      inStock: true,
    });
    
    await ctx.db.insert("desks", {
      name: "TechnoStand Smart",
      description: "Smart standing desk with integrated technology and mobile app control.",
      price: 899.99,
      features: [
        "Smart electric height adjustment",
        "Mobile app control via Bluetooth",
        "USB-C and standard USB charging ports",
        "Weight capacity: 300 lbs",
        "Desktop size: 55\" x 28\"",
        "Height range: 23\" to 49\"",
        "Health tracking and standing reminders",
        "Premium glass desktop with RGB lighting",
      ],
      categoryId: premiumCategoryId,
      inStock: false,
    });
    
    // Create desk converters
    await ctx.db.insert("desks", {
      name: "DesktopRiser Compact",
      description: "Compact desk converter that fits on your existing desk or table.",
      price: 149.99,
      features: [
        "Manual height adjustment",
        "Weight capacity: 35 lbs",
        "Surface size: 30\" x 20\"",
        "Folds flat for storage",
        "Non-slip surface",
      ],
      categoryId: converterCategoryId,
      inStock: true,
    });
    
    await ctx.db.insert("desks", {
      name: "DesktopRiser Deluxe",
      description: "Premium desk converter with electric height adjustment and dual monitor support.",
      price: 249.99,
      features: [
        "Electric height adjustment",
        "Weight capacity: 50 lbs",
        "Surface size: 36\" x 24\"",
        "Dual monitor support",
        "Keyboard tray",
        "Cable management",
      ],
      categoryId: converterCategoryId,
      inStock: true,
    });
    
    // Create FAQ items
    await ctx.db.insert("faqItems", {
      question: "How long does shipping take?",
      answer: "We ship most products within 1-2 business days. Standard delivery typically takes 5-7 business days. Expedited shipping options are available at checkout.",
      categoryId: undefined, // General FAQ
    });
    
    await ctx.db.insert("faqItems", {
      question: "Do your standing desks require assembly?",
      answer: "Yes, most of our standing desks require some assembly. Each product comes with detailed instructions, and we have assembly videos available on our website. Professional assembly services are available for an additional fee.",
      categoryId: undefined, // General FAQ
    });
    
    await ctx.db.insert("faqItems", {
      question: "What is your warranty policy?",
      answer: "Our Basic models come with a 3-year warranty. Premium models include a 5-year warranty on all mechanical and electrical components. Desk converters have a 2-year warranty. All warranties cover manufacturing defects and mechanical issues under normal use.",
      categoryId: undefined, // General FAQ
    });
    
    await ctx.db.insert("faqItems", {
      question: "How high do your standing desks go?",
      answer: "Our desks have different height ranges. Basic models typically adjust from 28\" to 48\", while Premium models have an extended range of 24\" to 50\". Desk specifications are listed on each product page.",
      categoryId: undefined, // General FAQ
    });
    
    await ctx.db.insert("faqItems", {
      question: "Can I return my standing desk if I don't like it?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied, you can return your desk for a full refund minus return shipping costs. The desk must be in its original condition with all packaging materials.",
      categoryId: undefined, // General FAQ
    });
    
    await ctx.db.insert("faqItems", {
      question: "What are the health benefits of a standing desk?",
      answer: "Standing desks can help reduce back pain, improve posture, increase energy levels, and may help with weight management by burning more calories throughout the day. We recommend alternating between sitting and standing for optimal benefits.",
      categoryId: undefined, // General FAQ
    });
    
    console.log("Database successfully seeded with standing desk data!");
    return null;
  },
});
