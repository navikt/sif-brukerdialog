import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../server/apiService';
import { getLogger } from '../../../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { saksnr } = req.query;
        if (!saksnr || typeof saksnr !== 'string') {
            const logger = getLogger(req);
            logger.error(`Kunne ikke hente inntektsmelding for sak`);
            return res.status(400).json({ error: 'Saksnummer mangler eller er ugyldig' });
        }
        const data = await fetchInntektsmeldinger(req, saksnr);
        res.send(data);
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent inntektsmeldinger feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente inntektsmeldinger' });
    }
}

export default withAuthenticatedApi(handler);
