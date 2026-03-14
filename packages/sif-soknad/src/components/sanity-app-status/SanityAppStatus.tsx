import { SanityConfig, sanityConfigIsValid, Status, StatusMessage, useAppStatus } from '@navikt/appstatus-react-ds';
import React from 'react';

import { LoadingSpinner } from './LoadingSpinner';

export interface SanityAppStatusProps {
    applicationKey: string;
    sanityConfig: SanityConfig;
    contentRenderer: () => React.ReactNode;
    unavailableContentRenderer: () => React.ReactNode;
}

/**
 * Wrapper som bruker useAppStatus for å se om applikasjon skal vises eller ikke.
 */
export const SanityAppStatus = ({
    applicationKey,
    contentRenderer,
    sanityConfig,
    unavailableContentRenderer,
}: SanityAppStatusProps) => {
    const { status, message, isLoading } = useAppStatus(applicationKey, sanityConfig);

    const renderContent = () => {
        if (status === Status.unavailable) {
            return unavailableContentRenderer();
        }
        return contentRenderer();
    };

    if (sanityConfigIsValid(sanityConfig) === false) {
        return renderContent();
    }

    return isLoading ? (
        <LoadingSpinner size="3xlarge" style="block" />
    ) : (
        <>
            {message !== undefined && (
                <div style={{ maxWidth: '704px', margin: '1rem auto' }}>
                    <StatusMessage message={message} />
                </div>
            )}
            {renderContent()}
        </>
    );
};
