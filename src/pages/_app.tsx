import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

// Create a Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexProvider client={convex}>
      <Component {...pageProps} />
    </ConvexProvider>
  );
}
