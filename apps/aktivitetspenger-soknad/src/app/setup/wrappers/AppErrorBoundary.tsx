import { SentryErrorBoundary } from '@sif/soknad/components';
import { FallbackErrorPage } from '@sif/soknad-ui';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const AppErrorBoundary = ({ children }: Props) => {
    return <SentryErrorBoundary fallback={<FallbackErrorPage />}>{children}</SentryErrorBoundary>;
};
