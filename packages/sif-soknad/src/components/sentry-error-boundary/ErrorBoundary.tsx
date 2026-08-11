import { ApmErrorBoundary } from '@nais/apm/react';
import { ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallback?: ReactNode;
    children: ReactNode;
}

export const ErrorBoundary = ({ fallback, children }: ErrorBoundaryProps) => {
    return <ApmErrorBoundary fallback={fallback ?? undefined}>{children}</ApmErrorBoundary>;
};
