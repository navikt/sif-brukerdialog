import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../server/apiService';
import { getLogger } from '../../../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchInntektsmeldinger(req);
        res.send(data);
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent inntektsmeldinger feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente inntektsmeldinger' });
    }
}

export default withAuthenticatedApi(handler);
