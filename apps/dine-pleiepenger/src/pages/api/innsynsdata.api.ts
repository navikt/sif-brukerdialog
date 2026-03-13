import * as Sentry from '@sentry/nextjs';
import { HttpStatusCode, isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { InnsynsdataDto } from '../../server/dto-schemas/innsynsdataDtoSchema';
import { fetchSakerMetadata } from '../../server/fetchers/fetchSakerMetadata';
import { fetchSøker } from '../../server/fetchers/fetchSøker';
import { prepApiError } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';
import { fetchAppStatus } from './appStatus.api';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const logger = getLogger(req).withContext({ operation: 'innsynsdata' });

    try {
        const unparsed = req.query.unparsed === 'true';

        const søker = await fetchSøker(req, unparsed);
        const sakerMetadata = await fetchSakerMetadata(req, unparsed);
        const appStatus = await fetchAppStatus();

        logger.info('Innsynsdata hentet', { antallSaker: sakerMetadata.length });

        const innsynsdata: InnsynsdataDto = {
            appStatus,
            søker,
            sakerMetadata,
            harSak: sakerMetadata.length > 0,
        };
        return res.json(innsynsdata);
    } catch (err) {
        Sentry.setTag('innsynsdata.status', 'error');
        Sentry.captureException(err, {
            tags: { endpoint: 'innsynsdata' },
            extra: { errorDetails: prepApiError(err) },
        });

        if (
            isAxiosError(err) &&
            (err.response?.status === HttpStatusCode.Forbidden ||
                err.response?.status === HttpStatusCode.UnavailableForLegalReasons)
        ) {
            return res.status(403).json({ error: 'Ikke tilgang' });
        } else {
            return res.status(500).json({ error: 'Kunne ikke hente innsynsdata' });
        }
    }
}

export default withAuthenticatedApi(handler);
