import { useFaroInstance } from '@navikt/sif-common-faro';
import * as Sentry from '@sentry/react';
import { AppErrorFallback } from '@sif/soknad-ui';
import React from 'react';

export const AppErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    const { logError } = useFaroInstance();
    return (
        <Sentry.ErrorBoundary onError={logError} fallback={<AppErrorFallback />}>
            {children}
        </Sentry.ErrorBoundary>
    );
};
