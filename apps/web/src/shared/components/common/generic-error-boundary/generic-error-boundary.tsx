"use client";

import { logger } from "@/modules/logger/lib/logger";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ErrorBoundaryFallback } from "./error-boundary-fallback";

type GenericErrorBoundaryProps = {
  fallback?: (props: FallbackProps) => React.ReactNode;
  children: React.ReactNode;
};

export function GenericErrorBoundary({ fallback, children }: GenericErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={fallback ?? ErrorBoundaryFallback} onError={logger.error}>
      {children}
    </ErrorBoundary>
  );
}
