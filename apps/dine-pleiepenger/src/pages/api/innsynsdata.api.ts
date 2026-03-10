import * as Sentry from '@sentry/nextjs';
import { HttpStatusCode, isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { InnsynsdataDto } from '../../server/dto-schemas/innsynsdataDtoSchema';
import { fetchSakerMetadata } from '../../server/fetchers/fetchSakerMetadata';
import { fetchSøker } from '../../server/fetchers/fetchSøker';
import { prepApiError } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { addBreadcrumb, withApiBreadcrumb } from '../../utils/sentryBreadcrumbs';
import { fetchAppStatus } from './appStatus.api';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const logger = getLogger(req);
    logger.info(`Henter innsynsdata`);
    addBreadcrumb({ category: 'api', message: 'Henter innsynsdata' });

    try {
        const unparsed = req.query.unparsed === 'true';

        // Hent søkerinformasjon
        const søker = await withApiBreadcrumb('sif-innsyn-api', 'fetchSøker', () => fetchSøker(req, unparsed));
        logger.info(`Hentet søkerinformasjon`);

        // Hent oversikt over saker
        const sakerMetadata = await withApiBreadcrumb('k9-sak-innsyn', 'fetchSakerMetadata', () =>
            fetchSakerMetadata(req, unparsed),
        );
        logger.info(`Hentet metadata`);

        // Hent appstatus som sier om appen er tilgjengelig eller ikke
        const appStatus = await withApiBreadcrumb('sanity', 'fetchAppStatus', () => fetchAppStatus());
        logger.info(`Hentet appstatus`);

        logger.info(`Hentet innsynsdata. Antall saker: ${sakerMetadata.length}`);

        // Logg til Sentry
        Sentry.setTag('innsynsdata.status', 'success');
        Sentry.setContext('innsynsdata', { antallSaker: sakerMetadata.length });

        const innsynsdata: InnsynsdataDto = {
            appStatus,
            søker,
            sakerMetadata,
            harSak: sakerMetadata.length > 0,
        };
        return res.json(innsynsdata);
    } catch (err) {
        logger.error(`Hent innsynsdata feilet`, prepApiError(err));

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
