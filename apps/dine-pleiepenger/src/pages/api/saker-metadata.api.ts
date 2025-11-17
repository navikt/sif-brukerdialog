import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSakerMetadata } from '../../server/fetchers/fetchSakerMetadata';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        const data = await fetchSakerMetadata(req, unparsed);
        res.send(data);
    } catch (err) {
        getLogger(req).error(`Hent saker feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saker' });
    }
}

export default withAuthenticatedApi(handler);
