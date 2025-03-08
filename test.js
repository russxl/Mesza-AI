import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

// Replace with your deployment URL - find it in the Convex dashboard
const address = process.env.CONVEX_URL || "https://balanced-wallaby-871.convex.cloud";
const client = new ConvexHttpClient(address);

async function test() {
  try {
    console.log("Testing terminalTest function...");
    const result = await client.action(api.serve.terminalTest, { message: "Hello, is this fixed now?" });
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
