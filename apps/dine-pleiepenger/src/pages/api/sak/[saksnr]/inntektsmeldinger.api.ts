import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../server/fetchers/fetchInntektsmeldinger';
import { prepApiError } from '../../../../utils/apiUtils';
import { getLogger } from '../../../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { saksnr } = req.query;
        if (!saksnr || typeof saksnr !== 'string') {
            const logger = getLogger(req);
            logger.error(`Kunne ikke hente inntektsmelding for sak`);
            return res.status(400).json({ error: 'Saksnummer mangler eller er ugyldig' });
        }
        const unparsed = req.query.unparsed === 'true';
        const data = await fetchInntektsmeldinger(req, saksnr, unparsed);
        res.send(data);
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent inntektsmeldinger feilet: ${prepApiError(err)}`);
        res.status(500).json({ error: `Kunne ikke hente inntektsmeldinger` });
    }
}

export default withAuthenticatedApi(handler);
