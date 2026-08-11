import { ApmErrorBoundary } from '@nais/apm/react';
import { ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallback?: ReactNode;
    children: ReactNode;
}

const ErrorBoundary = ({ fallback, children }: ErrorBoundaryProps) => (
    <ApmErrorBoundary fallback={fallback ?? undefined}>{children}</ApmErrorBoundary>
);

export default ErrorBoundary;
