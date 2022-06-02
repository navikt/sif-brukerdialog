import { Status, StatusMessage, useAppStatus } from '@navikt/appstatus-react';
import { SanityConfig } from '@navikt/appstatus-react/lib/types';
import React from 'react';
import LoadingSpinner from '../atoms/loading-spinner/LoadingSpinner';

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

    return isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '15rem', alignItems: 'center' }}>
            <LoadingSpinner type="XXL" />
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

export default AppStatusWrapper;
