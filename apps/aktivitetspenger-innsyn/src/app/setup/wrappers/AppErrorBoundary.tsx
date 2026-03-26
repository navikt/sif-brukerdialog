import { useFaroInstance } from '@navikt/sif-common-faro';
import { SentryErrorBoundary } from '@sif/soknad/components';
import { AppErrorFallback } from '@sif/soknad-ui';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const AppErrorBoundary = ({ children }: Props) => {
    const { logError } = useFaroInstance();

    return (
        <SentryErrorBoundary onError={logError} fallback={<AppErrorFallback />}>
            {children}
        </SentryErrorBoundary>
    );
};
