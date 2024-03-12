import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaker } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchSaker(req, true);
        res.json(data);
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent saker-raw feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saker-raw' });
    }
}

export default withAuthenticatedApi(handler);
