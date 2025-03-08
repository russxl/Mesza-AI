// Test script for OpenAI integration through the serve.ts module
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
  console.log("Testing OpenAI integration via terminal...");
  console.log("OPENAI_API_KEY available:", Boolean(process.env.OPENAI_API_KEY));
  console.log("ASSISTANT_ID available:", Boolean(process.env.ASSISTANT_ID));
  console.log("Convex URL:", deployUrl);
  
  try {
    // Using the correct module:function format for Convex
    const result = await client.action("serve:terminalTest", {
      message: "Hello, this is a test of the fixed function. Please respond."
    });
    
    console.log("\nAPI Response:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error calling terminalTest:", error.message);
    
    // If that doesn't work, try another way to call the function
    console.log("\nTrying an alternative approach...");
    
    try {
      // Try the deskChatbot module which we know works
      const message = "This is a test message from the terminal.";
      const sessionId = "test-session-" + Date.now();
      
      // First create a desk session
      const result1 = await client.mutation("desks:createDesk", {
        name: "Test Desk"
      });
      console.log("Created test desk:", result1);
      
      // Then try to add a message to the chat
      const result2 = await client.mutation("deskChatbot:addMessage", {
        sessionId,
        text: message,
        isUser: true
      });
      console.log("Added message:", result2);
      
      console.log("Test completed - check the Convex dashboard to see if it worked");
    } catch (fallbackError) {
      console.error("Fallback test error:", fallbackError.message);
    }
  }
}

main();
