import { AppErrorFallback } from '@common/components/error-boundary/AppErrorFallback';
import { ErrorBoundary } from '@common/components/error-boundary/ErrorBoundary';
import { logErrorToFaro } from '@common/utils/errorLogger';
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
