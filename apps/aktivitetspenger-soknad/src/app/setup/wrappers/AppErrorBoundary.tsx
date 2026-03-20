import { useFaroInstance } from '@navikt/sif-common-faro';
import { AppErrorFallback, ErrorBoundary } from '@sif/soknad/components';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const AppErrorBoundary = ({ children }: Props) => {
    const { logError } = useFaroInstance();

    return (
        <ErrorBoundary onError={logError} fallback={<AppErrorFallback />}>
            {children}
        </ErrorBoundary>
    );
};
