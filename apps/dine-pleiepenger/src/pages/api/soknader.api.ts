import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøknader } from '../../server/fetchers/fetchSøknader';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        const response = await fetchSøknader(req, unparsed);
        res.send(response);
    } catch (err) {
        getLogger(req).error(`Hent søknader feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søknader' });
    }
}

export default withAuthenticatedApi(handler);
