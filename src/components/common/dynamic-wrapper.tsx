'use client';

import { useEffect, useState } from 'react';

/**
 * A wrapper component that ensures content is only rendered on the client-side
 * This helps avoid hydration errors caused by browser extensions or dynamic content
 */
export default function DynamicWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render an empty element during SSR to avoid hydration mismatch
    return <div suppressHydrationWarning />;
  }

  return <>{children}</>;
}