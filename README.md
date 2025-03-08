# Mesza Standing Desk Website with AI Chatbot

A modern website for a premium standing desk company featuring an integrated AI chatbot powered by OpenAI. The website includes a homepage, product catalog, about page, and contact page.

## Features

- **Modern UI**: Clean, responsive design built with Next.js and Tailwind CSS
- **AI-Powered Chatbot**: Integrated chatbot with real-time message streaming
- **Product Showcase**: Browse standing desk models with detailed specifications
- **Interactive Elements**: Product details modal, form validation, and more

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Convex for backend functionality
- **AI Integration**: OpenAI Assistants API

## Getting Started

### Prerequisites

- Node.js 16+ and npm/pnpm/yarn
- OpenAI API Key
- Assistant ID from OpenAI

### Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_CONVEX_URL=your_convex_url
OPENAI_API_KEY=your_openai_api_key
ASSISTANT_ID=your_assistant_id
```

### Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

## Customization

### Chatbot

The AI chatbot can be customized by modifying the following files:

- `convex/serve.ts`: Backend implementation for the OpenAI integration
- `convex/messages.ts`: Manages message handling and storage
- `src/aiChat/index.tsx`: UI components for the chat interface

### Website Content

You can customize the website content by modifying:

- `src/pages/*.tsx`: Individual page content
- `src/components/layout/Layout.tsx`: Shared layout including the chatbot toggle

## Important Notes About OpenAI Integration

This project uses OpenAI SDK v4.86.2 with the following implementation details:

- Uses correct import syntax: `import { OpenAI } from "openai"`
- Properly handles message content streaming
- Uses appropriate type assertions for the Assistants API
- Implements real-time response streaming for a smooth user experience

## Deployment

This application can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

```bash
# Build for production
pnpm build

# Run production build locally
pnpm start
```
