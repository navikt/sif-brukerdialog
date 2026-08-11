import { ApmErrorBoundary } from '@nais/apm/react';
import { InnsynDefaultErrorMessage } from '@sif/ung-innsyn/components';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const AppErrorBoundary = ({ children }: Props) => (
    <ApmErrorBoundary fallback={<InnsynDefaultErrorMessage />}>{children}</ApmErrorBoundary>
);
