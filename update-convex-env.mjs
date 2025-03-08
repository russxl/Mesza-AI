// Script to update Convex environment variables
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user
const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

async function updateConvexEnv() {
  console.log("===== Convex Environment Variable Updater =====");
  
  try {
    // Get values from environment
    const apiKey = process.env.OPENAI_API_KEY;
    const assistantId = process.env.ASSISTANT_ID;
    
    console.log("Found in .env.local:");
    console.log(`- OPENAI_API_KEY: ${apiKey ? "✓ (Present)" : "✗ (Missing)"}`);
    console.log(`- ASSISTANT_ID: ${assistantId ? "✓ (Present)" : "✗ (Missing)"}`);
    
    if (!apiKey || !assistantId) {
      console.error("\nError: Missing required environment variables in .env.local");
      console.log("Please make sure both OPENAI_API_KEY and ASSISTANT_ID are set in your .env.local file.");
      return;
    }
    
    // Create a temporary JSON file with environment variables
    const tempEnvFile = path.join(__dirname, 'temp_env.json');
    const envData = {
      OPENAI_API_KEY: apiKey,
      ASSISTANT_ID: assistantId
    };
    
    fs.writeFileSync(tempEnvFile, JSON.stringify(envData, null, 2));
    console.log("\nTemporary environment file created.");
    
    // Ask for deployment name
    const deploymentName = await prompt("\nEnter your Convex deployment name (e.g., 'intent-dachshund-834'): ");
    
    if (!deploymentName) {
      console.error("Error: Deployment name is required");
      return;
    }
    
    console.log(`\nUpdating environment variables for deployment: ${deploymentName}`);
    console.log("WARNING: This will overwrite any existing environment variables with the same names!");
    
    const confirm = await prompt("Continue? (y/n): ");
    
    if (confirm.toLowerCase() !== 'y') {
      console.log("Operation cancelled");
      return;
    }
    
    // Execute the npx command to update environment variables
    console.log("\nUpdating Convex environment variables...");
    
    try {
      execSync(`npx convex vars push --deployment ${deploymentName} --merge-with ${tempEnvFile}`, { stdio: 'inherit' });
      console.log("\n✅ Environment variables updated successfully!");
    } catch (error) {
      console.error("\n❌ Error updating environment variables with 'vars push'");
      console.log("Trying alternative command...");
      
      try {
        execSync(`npx convex env set --deployment ${deploymentName} OPENAI_API_KEY="${apiKey}"`, { stdio: 'inherit' });
        execSync(`npx convex env set --deployment ${deploymentName} ASSISTANT_ID="${assistantId}"`, { stdio: 'inherit' });
        console.log("\n✅ Environment variables updated successfully with 'env set'!");
      } catch (innerError) {
        console.error("\n❌ Error updating environment variables with alternative method");
        console.log("Please manually update your environment variables in the Convex dashboard:");
        console.log("1. Go to https://dashboard.convex.dev");
        console.log("2. Select your project");
        console.log("3. Go to Settings > Environment Variables");
        console.log("4. Add these variables:");
        console.log(`   - OPENAI_API_KEY: ${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}`);
        console.log(`   - ASSISTANT_ID: ${assistantId}`);
      }
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);
  } finally {
    // Clean up temporary file
    const tempEnvFile = path.join(__dirname, 'temp_env.json');
    if (fs.existsSync(tempEnvFile)) {
      fs.unlinkSync(tempEnvFile);
      console.log("Temporary file cleaned up");
    }
    
    rl.close();
  }
}

// Run the function
updateConvexEnv();
