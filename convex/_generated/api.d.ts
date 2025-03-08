/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as deskChatbot from "../deskChatbot.js";
import type * as desks from "../desks.js";
import type * as environment from "../environment.js";
import type * as helpers from "../helpers.js";
import type * as http from "../http.js";
import type * as ingest_load from "../ingest/load.js";
import type * as messages from "../messages.js";
import type * as seed from "../seed.js";
import type * as serve from "../serve.js";
import type * as sessions from "../sessions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  deskChatbot: typeof deskChatbot;
  desks: typeof desks;
  environment: typeof environment;
  helpers: typeof helpers;
  http: typeof http;
  "ingest/load": typeof ingest_load;
  messages: typeof messages;
  seed: typeof seed;
  serve: typeof serve;
  sessions: typeof sessions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
