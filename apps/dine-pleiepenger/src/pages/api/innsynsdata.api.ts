import { HttpStatusCode, isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { InnsynsdataDto } from '../../server/dto-schemas/innsynsdataDtoSchema';
import { fetchSakerMetadata } from '../../server/fetchers/fetchSakerMetadata';
import { fetchSøker } from '../../server/fetchers/fetchSøker';
import { getLogger } from '../../utils/getLogCorrelationID';
import { fetchAppStatus } from './appStatus.api';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const logger = getLogger(req);
    logger.info(`Henter innsynsdata`);
    try {
        const unparsed = req.query.unparsed === 'true';

        // Hent søkerinformasjon
        const søker = await fetchSøker(req, unparsed);

        // Hent oversikt over saker
        const sakerMetadata = await fetchSakerMetadata(req, unparsed);

        // Hent appstatus som sier om appen er tilgjengelig eller ikke
        const appStatus = await fetchAppStatus();

        logger.info(`Hentet innsynsdata. Antall saker: ${sakerMetadata.length}`);

        const innsynsdata: InnsynsdataDto = {
            appStatus,
            søker,
            sakerMetadata,
            harSak: sakerMetadata.length > 0,
        };
        res.json(innsynsdata);
    } catch (err) {
        logger.error(`Hent innsynsdata feilet: ${err}`);
        if (
            isAxiosError(err) &&
            (err.response?.status === HttpStatusCode.Forbidden ||
                err.response?.status === HttpStatusCode.UnavailableForLegalReasons)
        ) {
            res.status(403).json({ error: 'Ikke tilgang' });
        } else {
            res.status(500).json({ error: 'Kunne ikke hente innsynsdata' });
        }
    }
}

export default withAuthenticatedApi(handler);
