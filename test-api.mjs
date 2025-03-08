// Script to explore the Convex API
import { ConvexHttpClient } from "convex/browser";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

// Create Convex client
const deployUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://intent-dachshund-834.convex.cloud";
const client = new ConvexHttpClient(deployUrl);

async function main() {
  try {
    // Test listing available endpoints
    console.log("Available API endpoints:");
    
    // Try accessing the API modules directly
    const modules = await client.query("listModules", {});
    console.log(modules);
  } catch (error) {
    console.error("Error:", error);
    
    // Try an alternative way to identify available functions
    try {
      // Test with a known query function that should be available
      const result = await client.query("deskChatbot:getMessages", { sessionId: "test-session" });
      console.log("Result from deskChatbot:getMessages:", result);
    } catch (secondError) {
      console.error("Error with query test:", secondError);
    }
  }
}

main();
