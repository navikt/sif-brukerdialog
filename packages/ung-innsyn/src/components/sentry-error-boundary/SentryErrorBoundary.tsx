import * as Sentry from '@sentry/react';
import React from 'react';

import { InnsynDefaultErrorMessage } from '../innsyn-default-error-message/InnsynDefaultErrorMessage';

interface ErrorBoundaryProps {
    fallback?: React.ReactElement;
    onError?: (error: Error, componentStack: string) => void;
    children: React.ReactNode;
}

export const SentryErrorBoundary = ({ fallback, onError, children }: ErrorBoundaryProps) => {
    return (
        <Sentry.ErrorBoundary
            fallback={fallback || <InnsynDefaultErrorMessage />}
            onError={(error, componentStack) => {
                // eslint-disable-next-line no-console
                console.error('ErrorBoundary caught an error:', error, componentStack);
                if (error instanceof Error) {
                    onError?.(error, componentStack);
                }
            }}>
            {children}
        </Sentry.ErrorBoundary>
    );
};
