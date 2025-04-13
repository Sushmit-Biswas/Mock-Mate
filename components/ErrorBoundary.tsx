"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ 
  children, 
  fallback = <DefaultErrorFallback /> 
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Error caught by boundary:", error);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);

    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

const DefaultErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-dark-200 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-red-400">Oops! Something went wrong</h2>
      <p className="mb-6 text-white/80">We encountered an error while loading this content.</p>
      <Button 
        className="btn-primary"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorBoundary;
