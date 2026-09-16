import React from 'react';

import { SanityConfig, Status } from '../../types';
import useAppStatus from '../../hooks/useAppStatus';
import { sanityConfigIsValid } from '../../utils';
import StatusMessage from '../status-message/StatusMessage';
import { Loader } from '@navikt/ds-react';

interface Props {
    applicationKey: string;
    sanityConfig: SanityConfig;
    contentRenderer: () => React.ReactNode;
    unavailableContentRenderer?: () => React.ReactNode;
}

export const AppStatusWrapper = ({
    applicationKey,
    contentRenderer,
    sanityConfig,
    unavailableContentRenderer,
}: Props) => {
    const { status, message, isLoading } = useAppStatus(applicationKey, sanityConfig);

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
            {renderContent()}
        </>
    );
};
