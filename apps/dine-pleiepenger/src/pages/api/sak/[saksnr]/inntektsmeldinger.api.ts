import type { NextApiRequest, NextApiResponse } from 'next';
import z from 'zod';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../server/fetchers/fetchInntektsmeldinger';
import { getLogger } from '../../../../utils/getLogCorrelationID';
import { getZodErrorsInfo } from '../../../../utils/zodUtils';

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
        const parseError = err instanceof z.ZodError ? JSON.stringify(getZodErrorsInfo(err)) : undefined;

        logger.error(`Hent inntektsmeldinger feilet: ${parseError || err}`);
        res.status(500).json({ error: `Kunne ikke hente inntektsmeldinger` });
    }
}

export default withAuthenticatedApi(handler);
