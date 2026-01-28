// src/components/common/error-boundary.tsx
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error }> = ({ error }) => (
  <div className="p-6 bg-red-50 border border-red-200 rounded-md">
    <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
    {error && (
      <p className="mt-2 text-red-600">
        Error: {error.message}
      </p>
    )}
    <button 
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      onClick={() => window.location.reload()}
    >
      Reload Page
    </button>
  </div>
);

export { ErrorBoundary, DefaultErrorFallback };