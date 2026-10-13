import { AppStatusNotice, NoticeRenderers, SanityConfig, Status, useAppStatus } from '@navikt/appstatus-react-ds';
import { sanityConfigIsValid } from '@navikt/appstatus-react-ds/src/utils';
import React from 'react';

import LoadingSpinner from '../../atoms/loading-spinner/LoadingSpinner';

interface Props {
    applicationKey: string;
    sanityConfig: SanityConfig;
    contentRenderer: () => React.ReactNode;
    unavailableContentRenderer?: () => React.ReactNode;
    noticeRenderers?: NoticeRenderers;
}

const AppStatusWrapper = ({
    applicationKey,
    contentRenderer,
    sanityConfig,
    unavailableContentRenderer,
    noticeRenderers,
}: Props) => {
    const { status, notice, isLoading } = useAppStatus(applicationKey, sanityConfig);

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

export default AppStatusWrapper;
