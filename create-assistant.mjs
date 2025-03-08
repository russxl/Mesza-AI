// Script to create a new OpenAI Assistant
import { OpenAI } from "openai";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function createAssistant() {
  console.log("Creating new OpenAI Assistant...");
  
  // Get API key from environment
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("Error: OPENAI_API_KEY is not set!");
    return;
  }
  
  try {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
      defaultHeaders: {
        'OpenAI-Beta': 'assistants=v2'
      }
    });
    
    // Create a new assistant
    console.log("Creating assistant...");
    const assistant = await openai.beta.assistants.create({
      name: "Lucky AI Bot",
      description: "A helpful AI assistant for general conversations",
      instructions: "You are a helpful, friendly assistant. You should be conversational, informative, and engage with the user in a natural way. Be concise but thorough in your responses.",
      model: "gpt-4-turbo-preview", // You can change this to another model if needed
    });
    
    console.log("\n✅ Assistant created successfully!");
    console.log("Assistant ID:", assistant.id);
    console.log("Assistant Name:", assistant.name);
    
    // Update the .env.local file with the new assistant ID
    const envPath = path.join(__dirname, '.env.local');
    let envContent = '';
    
    try {
      // Read existing content
      envContent = fs.readFileSync(envPath, 'utf8');
    } catch (err) {
      // If file doesn't exist, start with empty content
      console.log("Creating new .env.local file");
    }
    
    // Replace or add ASSISTANT_ID
    if (envContent.includes('ASSISTANT_ID=')) {
      // Replace existing ASSISTANT_ID
      envContent = envContent.replace(/ASSISTANT_ID=.*/g, `ASSISTANT_ID=${assistant.id}`);
    } else {
      // Add new ASSISTANT_ID
      envContent += `\nASSISTANT_ID=${assistant.id}`;
    }
    
    // Write back to file
    fs.writeFileSync(envPath, envContent);
    console.log("\n✅ Updated .env.local with new Assistant ID");
    
    console.log("\nNext steps:");
    console.log("1. Push the environment variables to Convex using:");
    console.log("   npx convex env push");
    console.log("2. Restart your development server");
    
  } catch (error) {
    console.error("❌ Error creating assistant:", error.message);
    if (error.response) {
      console.error("Response error:", error.response.data);
    }
  }
}

// Run the function
createAssistant();
