/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONVEX_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_ASSISTANT_ID: string;
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
