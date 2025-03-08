import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config({ path: './.env.local' });

async function testOpenAIConnection() {
  console.log('Testing OpenAI connection...');
  
  // Check if API key exists
  if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY environment variable is not set!');
    console.log('Make sure you have a .env.local file with OPENAI_API_KEY=sk-your-key-here');
    return;
  }
  
  // Check if Assistant ID exists
  if (!process.env.ASSISTANT_ID) {
    console.error('ERROR: ASSISTANT_ID environment variable is not set!');
    console.log('Make sure you have a .env.local file with ASSISTANT_ID=asst-your-assistant-id');
    return;
  }
  
  try {
    const openai = new OpenAI();
    
    // Test the API key by making a simple models request
    console.log('Checking API key validity...');
    const models = await openai.models.list();
    console.log('✅ API key is valid!');
    
    // Try to retrieve the assistant
    console.log(`Checking Assistant ID: ${process.env.ASSISTANT_ID}...`);
    try {
      const assistant = await openai.beta.assistants.retrieve(process.env.ASSISTANT_ID);
      console.log('✅ Assistant found!');
      console.log(`Assistant name: ${assistant.name}`);
    } catch (err) {
      console.error('❌ Error retrieving assistant:', err.message);
      console.log('Make sure your ASSISTANT_ID is correct and the assistant exists in your OpenAI account.');
    }
    
  } catch (error) {
    console.error('❌ API connection error:', error.message);
    console.log('Make sure your OpenAI API key is correct and not expired.');
  }
}

testOpenAIConnection();
