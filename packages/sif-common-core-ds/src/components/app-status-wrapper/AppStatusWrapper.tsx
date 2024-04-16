import { SanityConfig, Status, StatusMessage, useAppStatus } from '@navikt/appstatus-react-ds';
import React from 'react';
import LoadingSpinner from '../../atoms/loading-spinner/LoadingSpinner';
import { sanityConfigIsValid } from '@navikt/appstatus-react-ds/src/utils';

interface Props {
    applicationKey: string;
    sanityConfig: SanityConfig;
    contentRenderer: () => React.ReactNode;
    unavailableContentRenderer?: () => React.ReactNode;
}

const AppStatusWrapper = ({ applicationKey, contentRenderer, sanityConfig, unavailableContentRenderer }: Props) => {
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

export default AppStatusWrapper;
