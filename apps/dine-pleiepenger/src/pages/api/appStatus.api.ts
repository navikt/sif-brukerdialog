import { fetchStatus, SanityConfig } from '@navikt/appstatus-react-ds';
import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { prepApiError } from '../../utils/apiUtils';
import { browserEnv } from '../../utils/env';
import { Feature } from '../../utils/features';
import { getLogger } from '../../utils/getLogCorrelationID';
import { AMPLITUDE_APPLICATION_KEY } from '../_app.page';

const sanityConfig: SanityConfig = {
    projectId: browserEnv.NEXT_PUBLIC_APPSTATUS_PROJECT_ID,
    dataset: browserEnv.NEXT_PUBLIC_APPSTATUS_DATASET,
};

export const fetchAppStatus = async (): Promise<ApplicationState | undefined> => {
    return await fetchStatus(AMPLITUDE_APPLICATION_KEY, sanityConfig);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const logger = getLogger(req);
    if (Feature.HENT_APPSTATUS === false) {
        logger.info(`Feature AppStatus disabled, henter ikke appstatus`);
        return;
    }
    logger.info(`Henter appStatus`);
    try {
        return res.send(await fetchAppStatus());
    } catch (err) {
        logger.error(`Hent appStatus feilet`, prepApiError(err));
        return res.status(500).json({ error: 'Kunne ikke hente appStatus' });
    }
}

export default withAuthenticatedApi(handler);
