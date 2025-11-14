import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaksbehandlingstid } from '../../server/api-requests/fetchSaksbehandlingstid';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const raw = req.query.raw === 'true';
        const data = await fetchSaksbehandlingstid(req, raw);
        res.send(data);
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent saksbehandlingstid feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saksbehandlingstid' });
    }
}

export default withAuthenticatedApi(handler);
