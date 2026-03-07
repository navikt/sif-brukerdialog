import { AppErrorFallback, ErrorBoundary } from '@rammeverk/components';
import { logErrorToFaro } from '@rammeverk/utils';
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
