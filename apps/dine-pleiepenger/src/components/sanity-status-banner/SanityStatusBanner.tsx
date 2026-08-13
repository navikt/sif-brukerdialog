import { Status, StatusMessage, useAppStatus } from '@navikt/appstatus-react-ds';
import { Box } from '@navikt/ds-react';
import { ReactNode } from 'react';

import { maxPageWidth } from '../../constants';
import UnavailablePage from '../../pages/unavailable.page';
import { browserEnv } from '../../utils/env';

const APPLICATION_KEY = 'sif-innsyn';

interface Props {
    children: ReactNode;
}

const SanityStatusBanner = ({ children }: Props) => {
    const { status, message } = useAppStatus(APPLICATION_KEY, {
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

export default SanityStatusBanner;
