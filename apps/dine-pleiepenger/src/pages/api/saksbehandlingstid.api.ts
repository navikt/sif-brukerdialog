import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaksbehandlingstid } from '../../server/apiService';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchSaksbehandlingstid(req);
        res.send(data);
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent saksbehandlingstid feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saksbehandlingstid' });
    }
}

export default withAuthenticatedApi(handler);
