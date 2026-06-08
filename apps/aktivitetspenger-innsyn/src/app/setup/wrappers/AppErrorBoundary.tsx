import { useFaroInstance } from '@navikt/sif-common-faro';
import { SentryErrorBoundary } from '@sif/ung-innsyn/components';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const AppErrorBoundary = ({ children }: Props) => {
    const { logError } = useFaroInstance();
    return <SentryErrorBoundary onError={logError}>{children}</SentryErrorBoundary>;
};
