import React from 'react';

import { SanityConfig, sanityConfigIsValid, Status, useAppStatus } from '../../index';
import { AppStatusNotice, NoticeRenderers } from '../app-status-notice/AppStatusNotice';
import { LoadingSpinner } from './LoadingSpinner';

export interface SanityAppStatusProps {
    applicationKey: string;
    sanityConfig: SanityConfig;
    contentRenderer: () => React.ReactNode;
    unavailableContentRenderer: () => React.ReactNode;
    noticeRenderers?: NoticeRenderers;
}

/**
 * Wrapper som bruker useAppStatus for å se om applikasjon skal vises eller ikke.
 */
export const SanityAppStatus = ({
    applicationKey,
    contentRenderer,
    sanityConfig,
    unavailableContentRenderer,
    noticeRenderers,
}: SanityAppStatusProps) => {
    const { status, notice, isLoading } = useAppStatus(applicationKey, sanityConfig);

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
            {notice !== undefined && (
                <div style={{ maxWidth: '704px', margin: '1rem auto' }}>
                    <AppStatusNotice notice={notice} renderers={noticeRenderers} />
                </div>
            )}
            {renderContent()}
        </>
    );
};
