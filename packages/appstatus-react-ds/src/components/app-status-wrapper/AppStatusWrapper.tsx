import { Loader } from '@navikt/ds-react';
import React from 'react';

import useAppStatus from '../../hooks/useAppStatus';
import { SanityConfig, Status } from '../../types';
import { sanityConfigIsValid } from '../../utils';
import { AppStatusNotice, NoticeRenderers } from '../app-status-notice/AppStatusNotice';
import StatusMessage from '../status-message/StatusMessage';

interface Props {
    applicationKey: string;
    sanityConfig: SanityConfig;
    contentRenderer: () => React.ReactNode;
    unavailableContentRenderer?: () => React.ReactNode;
    noticeRenderers?: NoticeRenderers;
}

export const AppStatusWrapper = ({
    applicationKey,
    contentRenderer,
    sanityConfig,
    unavailableContentRenderer,
    noticeRenderers,
}: Props) => {
    const { status, message, notice, isLoading } = useAppStatus(applicationKey, sanityConfig);

    const renderContent = () => {
        if (status === Status.unavailable && unavailableContentRenderer !== undefined) {
            return unavailableContentRenderer();
        }
        return contentRenderer();
    };

    if (sanityConfigIsValid(sanityConfig) === false) {
        return renderContent();
    }

    return isLoading ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '15rem',
                alignItems: 'center',
            }}>
            <Loader size="3xlarge" />
        </div>
    ) : (
        <>
            {message !== undefined && (
                <div style={{ maxWidth: '704px', margin: '1rem auto' }}>
                    <StatusMessage message={message} />
                </div>
            )}
            {notice !== undefined && (
                <div style={{ maxWidth: '704px', margin: '1rem auto' }}>
                    <AppStatusNotice notice={notice} renderers={noticeRenderers} />
                </div>
            )}
            {renderContent()}
        </>
    );
};
