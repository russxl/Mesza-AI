// ESM module to test the OpenAI integration via a direct call to the Convex server
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
  console.log("Testing AI terminal response...");
  console.log("OPENAI_API_KEY available:", Boolean(process.env.OPENAI_API_KEY));
  console.log("ASSISTANT_ID available:", Boolean(process.env.ASSISTANT_ID));
  console.log("Convex URL:", deployUrl);
  
  try {
    // Import the properly generated API path from the typegen
    // Using the internal action path format that matches how it's exported in serve.ts
    const result = await client.action("internal/serve:terminalTest", {
      message: "Hello, can you respond to this message?"
    });
    
    console.log("\nAPI Response:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error calling terminalTest:", error);
  }
}

main();
