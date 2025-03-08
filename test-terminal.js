// Test script for terminalTest function
import dotenv from 'dotenv';
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

// Load environment variables
dotenv.config({ path: './.env.local' });

// Deploy URL - Replace with your actual Convex deploy URL if different
const deployUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://balanced-wallaby-871.convex.cloud";

async function main() {
  // Initialize Convex client
  const client = new ConvexHttpClient(deployUrl);

  console.log("Testing terminalTest function with OpenAI integration...");
  console.log("OPENAI_API_KEY available:", !!process.env.OPENAI_API_KEY);
  console.log("ASSISTANT_ID available:", !!process.env.ASSISTANT_ID);
  
  try {
    const result = await client.action(api.serve.terminalTest, { 
      message: "Hello, is the fixed function working properly now?" 
    });
    
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error running terminalTest function:", error);
  }
}

main();
