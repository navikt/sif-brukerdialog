import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøker } from '../../server/api-requests/fetchSøker';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const raw = req.query.raw === 'true';
        res.send(await fetchSøker(req, raw));
    } catch (err) {
        getLogger(req).error(`Hent søker feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søker' });
    }
}

export default withAuthenticatedApi(handler);
