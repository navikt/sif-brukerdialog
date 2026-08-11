import { ApmErrorBoundary } from '@nais/apm/react';
import { AppErrorFallback } from '@sif/soknad-ui';
import { ReactNode } from 'react';

export const AppErrorBoundary = ({ children }: { children: ReactNode }) => {
    return <ApmErrorBoundary fallback={<AppErrorFallback />}>{children}</ApmErrorBoundary>;
};
