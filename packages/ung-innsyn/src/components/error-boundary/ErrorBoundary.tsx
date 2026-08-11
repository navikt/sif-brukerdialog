import { ApmErrorBoundary } from '@nais/apm/react';
import { ReactNode } from 'react';

import { InnsynDefaultErrorMessage } from '../innsyn-default-error-message/InnsynDefaultErrorMessage';

interface ErrorBoundaryProps {
    fallback?: ReactNode;
    children: ReactNode;
}

export const ErrorBoundary = ({ fallback, children }: ErrorBoundaryProps) => {
    return <ApmErrorBoundary fallback={fallback ?? <InnsynDefaultErrorMessage />}>{children}</ApmErrorBoundary>;
};
