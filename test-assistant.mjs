// Simple test script for OpenAI Assistant API
import { OpenAI } from "openai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function testAssistantAPI() {
  console.log("Testing OpenAI Assistant API configuration...");
  
  // Log environment variables (without revealing full key)
  const apiKey = process.env.OPENAI_API_KEY;
  const assistantId = process.env.ASSISTANT_ID;
  
  console.log("API Key:", apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}` : "NOT SET");
  console.log("Assistant ID:", assistantId || "NOT SET");
  console.log("API Key length:", apiKey ? apiKey.length : 0);
  console.log("Assistant ID exists:", !!assistantId);
  
  if (!apiKey) {
    console.error("Error: OPENAI_API_KEY is not set!");
    return;
  }
  
  if (!assistantId) {
    console.error("Error: ASSISTANT_ID is not set!");
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
    
    // First, verify the assistant exists
    console.log("\nVerifying assistant...");
    try {
      const assistant = await openai.beta.assistants.retrieve(assistantId);
      console.log("✅ Assistant verified:", assistant.name || assistant.id);
    } catch (error) {
      console.error("❌ Error retrieving assistant:", error.message);
      console.error("This suggests your ASSISTANT_ID is incorrect or the assistant was deleted");
      return;
    }
    
    // Test creating a thread
    console.log("\nCreating test thread...");
    const thread = await openai.beta.threads.create();
    console.log("✅ Thread created with ID:", thread.id);
    
    // Test sending a message
    console.log("\nSending test message...");
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "This is a test message. Please respond with a simple greeting."
    });
    console.log("✅ Message sent with ID:", message.id);
    
    // Test running the assistant
    console.log("\nRunning assistant...");
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    });
    console.log("✅ Run created with ID:", run.id);
    
    // Poll for completion
    console.log("\nPolling for completion...");
    let attempts = 0;
    const maxAttempts = 30;
    
    while (attempts < maxAttempts) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      console.log(`Attempt ${attempts}: Run status is "${runStatus.status}"`);
      
      if (runStatus.status === "completed") {
        // Get the assistant's response
        const messages = await openai.beta.threads.messages.list(thread.id);
        
        // Find assistant messages
        const assistantMessages = messages.data.filter(msg => msg.role === "assistant");
        
        if (assistantMessages.length > 0) {
          const latestMessage = assistantMessages[0];
          
          // Extract content safely
          let response = "";
          if (latestMessage.content && Array.isArray(latestMessage.content)) {
            response = latestMessage.content
              .filter(item => item.type === "text")
              .map(item => {
                return item.type === "text" ? (item.text?.value || "") : "";
              })
              .join("\n");
          }
          
          console.log("\n✅ Assistant responded:");
          console.log("--------------------------");
          console.log(response);
          console.log("--------------------------");
        } else {
          console.log("❌ No assistant messages found in the thread");
        }
        
        break;
      } else if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
        console.error(`❌ Run ${runStatus.status}`);
        if (runStatus.last_error) {
          console.error("Error details:", runStatus.last_error);
        }
        break;
      }
    }
    
    if (attempts >= maxAttempts) {
      console.error("❌ Timed out waiting for assistant response");
    }
    
    console.log("\nTest completed.");
    
  } catch (error) {
    console.error("❌ Error during test:", error.message);
    if (error.response) {
      console.error("Response error:", error.response.data);
    }
  }
}

// Run the test
testAssistantAPI();
