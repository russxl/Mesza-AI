import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api, internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/api/seed",
  method: "POST",
  handler: httpAction(async (ctx, _request) => {
    try {
      await ctx.runMutation(internal.seed.seedDatabase, {});
      return new Response(
        JSON.stringify({ success: true, message: "Database seeded successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Seed error:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to seed database", 
          error: error instanceof Error ? error.message : String(error)
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

// API endpoint to get all desk products
http.route({
  path: "/api/desks",
  method: "GET",
  handler: httpAction(async (ctx, _request) => {
    try {
      const url = new URL(_request.url);
      const categoryIdStr = url.searchParams.get("categoryId");
      
      let desks;
      if (categoryIdStr) {
        // Convert string ID to proper Convex ID type
        try {
          const categoryId = categoryIdStr as any;
          desks = await ctx.runQuery(api.desks.listDesks, { categoryId });
        } catch (err) {
          // Handle invalid ID format
          return new Response(
            JSON.stringify({ success: false, message: "Invalid category ID format" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      } else {
        desks = await ctx.runQuery(api.desks.listDesks, {});
      }
      
      return new Response(
        JSON.stringify({ success: true, desks }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error fetching desks:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to fetch desks", 
          error: error instanceof Error ? error.message : String(error)
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

// API endpoint to get FAQ items
http.route({
  path: "/api/faqs",
  method: "GET",
  handler: httpAction(async (ctx, _request) => {
    try {
      // Note: The listFaqs function doesn't take any parameters
      // so we're ignoring any query parameters
      const faqs = await ctx.runQuery(api.desks.listFaqs, {});
      
      return new Response(
        JSON.stringify({ success: true, faqs }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to fetch FAQs", 
          error: error instanceof Error ? error.message : String(error)
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;
