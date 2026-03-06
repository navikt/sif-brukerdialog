import { AppErrorFallback } from '@rammeverk/components/error-boundary/AppErrorFallback';
import { ErrorBoundary } from '@rammeverk/components/error-boundary/ErrorBoundary';
import { logErrorToFaro } from '@rammeverk/utils/faroErrorLogger';
import React from 'react';

interface Props {
    children: React.ReactNode;
}
export const AppErrorBoundary = ({ children }: Props) => (
    <ErrorBoundary
        onError={(err, componentStack) => logErrorToFaro('sif-demo-app', err, componentStack)}
        fallback={<AppErrorFallback />}>
        {children}
    </ErrorBoundary>
);
