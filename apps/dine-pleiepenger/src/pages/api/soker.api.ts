import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøker } from '../../server/fetchers/fetchSøker';
import { logApiErrorToSentry } from '../../utils/sentryApiErrorLogger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        return res.send(await fetchSøker(req, unparsed));
    } catch (err) {
        // Feillogging til nav-logs skjer i fetcherne
        logApiErrorToSentry(err, 'soker');
        return res.status(500).json({ error: 'Kunne ikke hente søker' });
    }
}

export default withAuthenticatedApi(handler);
