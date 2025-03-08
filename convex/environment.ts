// Environment utility functions
import dotenv from "dotenv";

// Constants
export interface EnvironmentVariables {
  OPENAI_API_KEY?: string;
  ASSISTANT_ID?: string;
  // Add other environment variables as needed
}

// Function to get environment variables
export function getEnvironmentVariables(): EnvironmentVariables {
  try {
    // For Convex, we don't directly use file system
    // Instead use environment variables that should be set in the Convex dashboard
    return {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
      ASSISTANT_ID: process.env.ASSISTANT_ID || "",
    };
  } catch (error) {
    console.error("Error loading environment variables:", error);
    return {
      OPENAI_API_KEY: "",
      ASSISTANT_ID: "",
    };
  }
}
