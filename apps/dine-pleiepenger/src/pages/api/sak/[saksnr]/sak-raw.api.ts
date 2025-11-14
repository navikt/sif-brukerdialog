import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchSakMedInntektsmeldinger } from '../../../../server/apiService';
import { getLogger } from '../../../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { saksnr } = req.query;
        if (!saksnr || typeof saksnr !== 'string') {
            const logger = getLogger(req);
            logger.error(`Saksnummer mangler eller er ugyldig`);
            return res.status(400).json({ error: 'Saksnummer mangler eller er ugyldig' });
        }

        const logger = getLogger(req);
        logger.info(`Henter saksdetaljer for saksnummer: ${saksnr}`);

        const data = await fetchSakMedInntektsmeldinger(req, saksnr, true);

        res.json(data);
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent saksdetaljer feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saksdetaljer' });
    }
}

export default withAuthenticatedApi(handler);
