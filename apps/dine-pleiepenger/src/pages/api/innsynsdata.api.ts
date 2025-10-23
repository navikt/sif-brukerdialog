import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaker, fetchSøker } from '../../server/apiService';
import { Innsynsdata } from '../../types/InnsynData';
import { isSakerParseError } from '../../types/SakerParseError';
import { Feature } from '../../utils/features';
import { getLogger } from '../../utils/getLogCorrelationID';
import { fetchAppStatus } from './appStatus.api';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const logger = getLogger(req);
    logger.info(`Henter innsynsdata`);
    try {
        /** Hent søker først for å se om bruker har tilgang */
        const søker = await fetchSøker(req);

        /** Bruker har tilgang, hent resten av informasjonen */
        const [sakerReq, appStatus] = await Promise.allSettled([
            fetchSaker(req),
            Feature.HENT_APPSTATUS ? fetchAppStatus() : Promise.resolve(undefined),
        ]);
        logger.info(`Hentet innsynsdata`);

        logger.info(`Parser innsynsdata`);

        const saker = sakerReq.status === 'fulfilled' ? sakerReq.value : [];
        const harSak = saker.length > 0;

        const innsynsdata: Innsynsdata = {
            appStatus: appStatus.status === 'fulfilled' ? appStatus.value : undefined,
            søker,
            saker,
            harSak,
            sakerParseError:
                sakerReq.status === 'rejected' && isSakerParseError(sakerReq.reason) ? sakerReq.reason : undefined,
        };
        res.json(innsynsdata);
    } catch (err) {
        logger.error(`Hent innsynsdata feilet: ${err}`);
        if (
            err.response.status === HttpStatusCode.Forbidden ||
            err.response.status === HttpStatusCode.UnavailableForLegalReasons
        ) {
            res.status(403).json({ error: 'Ikke tilgang' });
        } else {
            res.status(500).json({ error: 'Kunne ikke hente innsynsdata' });
        }
    }
}

export default withAuthenticatedApi(handler);
