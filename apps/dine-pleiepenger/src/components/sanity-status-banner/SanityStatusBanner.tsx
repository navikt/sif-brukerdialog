import { Status, StatusMessage, useAppStatus } from '@navikt/appstatus-react-ds';
import { Box } from '@navikt/ds-react';
import { ReactNode } from 'react';

import { maxPageWidth } from '../../constants';
import UnavailablePage from '../../pages/unavailable.page';
import { browserEnv } from '../../utils/env';
import { Feature } from '../../utils/features';
import { InnsynPsbApp } from '@navikt/sif-app-register';

interface Props {
    children: ReactNode;
}

const SanityStatusBannerInner = ({ children }: Props) => {
    const { status, message } = useAppStatus(InnsynPsbApp.key, {
        projectId: browserEnv.NEXT_PUBLIC_APPSTATUS_PROJECT_ID,
        dataset: browserEnv.NEXT_PUBLIC_APPSTATUS_DATASET,
    });

    return (
        <>
            {message && (
                <Box maxWidth={maxPageWidth} marginInline="auto" marginBlock="space-48">
                    <StatusMessage message={message} />
                </Box>
            )}
            {status === Status.unavailable ? <UnavailablePage /> : children}
        </>
    );
};

const SanityStatusBanner = ({ children }: Props) => {
    if (!Feature.HENT_APPSTATUS) {
        return <>{children}</>;
    }
    return <SanityStatusBannerInner>{children}</SanityStatusBannerInner>;
};

export default SanityStatusBanner;
