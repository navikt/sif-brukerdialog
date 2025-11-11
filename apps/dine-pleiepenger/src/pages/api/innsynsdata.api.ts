import { HttpStatusCode, isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSakerMetadata, fetchSøker } from '../../server/apiService';
import { Innsynsdata } from '../../types/InnsynData';
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
        const [sakerMetadataReq, appStatus] = await Promise.allSettled([
            fetchSakerMetadata(req),
            Feature.HENT_APPSTATUS ? fetchAppStatus() : Promise.resolve(undefined),
        ]);
        logger.info(`Hentet innsynsdata`);

        const sakerMetadata = sakerMetadataReq.status === 'fulfilled' ? sakerMetadataReq.value : [];
        const harSak = sakerMetadata.length > 0;

        const innsynsdata: Innsynsdata = {
            appStatus: appStatus.status === 'fulfilled' ? appStatus.value : undefined,
            søker,
            sakerMetadata,
            harSak,
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
