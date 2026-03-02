'use client';

/**
 * providers.jsx
 *
 * Client-side providers that need access to hooks/state.
 * - React Query (used across many pages)
 * - Toast provider (shadcn/ui)
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

export default function Providers({ children }) {
  // Create one QueryClient per browser session.
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
