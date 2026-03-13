import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaksbehandlingstid } from '../../server/fetchers/fetchSaksbehandlingstid';
import { logApiErrorToSentry } from '../../utils/sentryApiErrorLogger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        const data = await fetchSaksbehandlingstid(req, unparsed);
        return res.send(data);
    } catch (err) {
        // Feillogging til nav-logs skjer i fetcherne
        logApiErrorToSentry(err, 'saksbehandlingstid');
        return res.status(500).json({ error: 'Kunne ikke hente saksbehandlingstid' });
    }
}

export default withAuthenticatedApi(handler);
