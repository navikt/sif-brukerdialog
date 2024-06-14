import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøker } from '../../server/apiService';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.send(await fetchSøker(req));
    } catch (err) {
        getLogger(req).error(`Hent søker feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søker' });
    }
}

export default withAuthenticatedApi(handler);
