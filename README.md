# Mesza Standing Desk Website with AI Chatbot

A modern, professional website for Mesza, a premium standing desk company featuring an integrated AI chatbot powered by OpenAI. The website includes a homepage, product catalog, about page, and contact page with a sophisticated chatbot interface to assist customers in real-time.

![Mesza AI Chat](https://i.imgur.com/YourScreenshotHere.png)

## Features

- **Modern, Professional UI**: Clean, responsive design built with React and Tailwind CSS
- **AI-Powered Chatbot**: Integrated chatbot with real-time message streaming and typing indicators
- **Product Showcase**: Browse standing desk models with detailed specifications and filtering options
- **Interactive Elements**: Product details modal, form validation, and dynamic UI components
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic theme detection with manual toggle option

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, React Router
- **State Management**: React context API and hooks
- **Backend**: Convex for serverless backend functionality
- **AI Integration**: OpenAI API with assistant threads and streaming responses
- **UI Components**: Custom components with Tailwind styling
- **Deployment**: Ready for deployment on Vercel, Netlify, or any static hosting

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 16+ and npm/pnpm/yarn
- Git for version control
- An OpenAI API Key with access to the Assistants API
- A Convex account for backend services

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/russxl/Mesza-AI.git
cd Mesza-AI
```

### 2. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
VITE_CONVEX_URL=your_convex_url
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_ASSISTANT_ID=your_assistant_id
```

### 3. Convex Setup

1. Install the Convex CLI:

```bash
npm install -g convex
```

2. Log in to your Convex account:

```bash
npx convex login
```

3. Initialize your Convex project:

```bash
npx convex init
```

4. Deploy your Convex functions:

```bash
npx convex push
```

### 4. OpenAI Assistant Setup

1. Create an OpenAI Assistant through the [OpenAI platform](https://platform.openai.com/assistants)
   - Sign in to your OpenAI account
   - Navigate to the Assistants section
   - Click 'Create Assistant'
   - Name your assistant (e.g., 'Mesza Desk Specialist')
   - Choose GPT-4 or GPT-4 Turbo as the model for best performance
   - Set the assistant's instructions to focus on standing desk expertise, product knowledge, and customer service
   - Example instructions: 'You are a helpful assistant for Mesza Standing Desks. Provide detailed information about our standing desk products, help customers choose the right desk for their needs, answer questions about features, pricing, and technical specifications, and assist with order inquiries and troubleshooting.'
   - Add relevant knowledge files if available (product catalogs, specifications, FAQs)
   - Enable any relevant tools (code interpreter may be useful for calculations)

2. Copy the Assistant ID from the assistant details page

3. Add the Assistant ID to your `.env.local` file

4. You can customize the assistant's capabilities by adding knowledge files or adjusting instructions at any time through the OpenAI platform

### 5. Install Dependencies

```bash
npm install
# or if using yarn
yarn install
# or if using pnpm
pnpm install
```

### 6. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure

```
├── convex/                # Convex backend functions and schema
│   ├── messages.ts        # Chat message handling functions
│   ├── schema.ts          # Database schema definitions
│   └── _generated/        # Auto-generated Convex files (do not edit)
├── public/                # Static assets
│   ├── images/            # Image assets
│   └── favicon.ico        # Website favicon
├── src/
│   ├── aiChat/            # AI chat components and integration
│   │   ├── components/    # Chat UI components
│   │   ├── hooks/         # Custom hooks for chat functionality
│   │   ├── context/       # Chat context providers
│   │   └── index.tsx      # Main chat component export
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Layout components (header, footer, etc.)
│   │   └── ui/            # Basic UI components (buttons, inputs, etc.)
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Homepage component
│   │   ├── Products.tsx   # Products page component
│   │   ├── About.tsx      # About page component
│   │   └── Contact.tsx    # Contact page component
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # TypeScript declarations for Vite
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite build configuration
```

## Using the AI Chatbot

The AI chatbot is integrated into the website and can be accessed by clicking the chat button in the bottom-right corner of any page. The chatbot is designed to help users with the following:

- **Product Recommendations**: Suggest standing desks based on user needs
- **Technical Specifications**: Answer questions about desk features and capabilities
- **Ordering Assistance**: Guide users through the ordering process
- **Troubleshooting**: Help with common issues and questions

### Chat Features

- **Real-time Responses**: The chatbot provides instant responses with typing indicators
- **Conversation History**: The chat maintains conversation context within a session
- **Minimization**: The chat can be minimized while browsing the site
- **Clear Chat**: Users can clear the conversation history at any time

## Testing

### Running Tests

This project uses Vitest and React Testing Library for testing components and functionality:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Testing the AI Integration

To test the OpenAI integration:

1. Ensure your OpenAI API key is correctly configured in the `.env.local` file
2. Start the development server: `npm run dev`
3. Open the application and click the chat button
4. Test the chat with various queries related to standing desks
5. Verify that the assistant responds appropriately and maintains context

### Manual Testing Checklist

- [ ] Chat opens and closes properly
- [ ] Messages are sent and received correctly
- [ ] Typing indicators display while waiting for AI responses
- [ ] Chat history persists during a session
- [ ] Clear chat functionality works
- [ ] Responsive design functions correctly on different devices
- [ ] Dark/light mode toggle works as expected

## Customization

### Modifying the Chatbot

The AI chatbot can be customized by modifying the following files:

- `src/aiChat/index.tsx`: Main chatbot component
- `src/aiChat/components/`: UI components for the chat interface
- `convex/messages.ts`: Backend functions for handling chat messages
- OpenAI Assistant settings through the OpenAI platform

### Styling

This project uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `tailwind.config.js` to change the color scheme and other design tokens
2. Editing component classes directly in their respective files
3. Creating new components with custom styles

### Content

Product information and website content can be edited in:

- Individual page components in the `src/pages/` directory
- Product data files (if applicable)
- Static assets in the `public/` directory

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The build output will be in the `dist` directory.

### Deploying to Vercel

1. Push your repository to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables in the Vercel dashboard:
   - `VITE_CONVEX_URL`
   - `VITE_OPENAI_API_KEY`
   - `VITE_ASSISTANT_ID`
4. Deploy your application

### Deploying to Netlify

1. Push your repository to GitHub
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify settings
5. Deploy your application

## Troubleshooting

### Common Issues

1. **Chat not connecting**: 
   - Ensure your Convex URL and OpenAI API key are correctly set in the `.env.local` file
   - Check if your OpenAI API key has billing enabled
   - Verify that your Convex deployment is active

2. **API key errors**: 
   - Verify that your OpenAI API key has access to the Assistants API
   - Check if you have available credits in your OpenAI account
   - Ensure the API key hasn't expired or been revoked

3. **Styling issues**: 
   - Clear your browser cache or try a different browser if styles aren't applying correctly
   - Verify that Tailwind CSS is properly configured
   - Check for conflicting CSS rules

4. **Convex connection issues**:
   - Ensure you've run `npx convex push` to deploy your Convex functions
   - Check the Convex dashboard for any deployment errors
   - Verify that your Convex URL is correctly set in the `.env.local` file

### Development Tips

1. Use the browser console to debug JavaScript issues
2. Check the Network tab in developer tools to monitor API requests
3. Use Convex Dev tools to view database changes in real-time
4. Check React DevTools for component hierarchy and state

### Getting Help

If you encounter any issues:

1. Check the browser console for error messages
2. Inspect the Network tab in your browser's developer tools
3. Review the Convex logs in your Convex dashboard
4. Open an issue on the GitHub repository
5. Reach out through the contact information below

## Contributing

Contributions to improve Mesza-AI are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-new-feature`
3. Make your changes
4. Run tests to ensure everything works: `npm run test`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/my-new-feature`
7. Submit a pull request

### Code Style Guidelines

- Follow the existing code style
- Use TypeScript for type safety
- Write tests for new features
- Document your code with comments
- Update the README if necessary

## Version History

- **1.0.0** - Initial release with core features
- **1.1.0** - Added dark mode support
- **1.2.0** - Enhanced AI chatbot capabilities
- **1.3.0** - Improved mobile responsiveness
- **1.4.0** - Added product filtering and search functionality

## Contact

For questions, support, or feedback:

- **GitHub**: [github.com/russxl/Mesza-AI](https://github.com/russxl/Mesza-AI)
- **Email**: support@mesza.com
- **Website**: [mesza.com](https://mesza.com)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for Mesza Standing Desks
