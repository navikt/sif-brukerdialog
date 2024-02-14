import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { getXRequestId } from '../../utils/apiUtils';
import { SanityConfig, fetchStatus } from '@navikt/appstatus-react-ds';
import { browserEnv } from '../../utils/env';
import { APPLICATION_KEY } from '../_app.page';
import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';

const sanityConfig: SanityConfig = {
    projectId: browserEnv.NEXT_PUBLIC_APPSTATUS_PROJECT_ID,
    dataset: browserEnv.NEXT_PUBLIC_APPSTATUS_DATASET,
};

export const fetchAppStatus = async (): Promise<ApplicationState | undefined> => {
    return await fetchStatus(APPLICATION_KEY, sanityConfig);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const childLogger = createChildLogger(getXRequestId(req));
    childLogger.info(`Henter appStatus`);
    try {
        res.send(await fetchAppStatus());
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent appStatus feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente appStatus', err });
    }
}

export default withAuthenticatedApi(handler);
