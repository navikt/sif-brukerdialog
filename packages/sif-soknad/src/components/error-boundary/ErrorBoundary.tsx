import * as Sentry from '@sentry/react';
import React from 'react';

interface ErrorBoundaryProps {
    fallback?: React.ReactElement;
    onError?: (error: Error, componentStack: string) => void;
    children: React.ReactNode;
}

export const ErrorBoundary = ({ fallback, onError, children }: ErrorBoundaryProps) => {
    return (
        <Sentry.ErrorBoundary
            fallback={fallback}
            onError={(error, componentStack) => {
                if (error instanceof Error) {
                    onError?.(error, componentStack);
                }
            }}>
            {children}
        </Sentry.ErrorBoundary>
    );
};
