import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaksbehandlingstid } from '../../server/fetchers/fetchSaksbehandlingstid';
import { prepApiError } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        const data = await fetchSaksbehandlingstid(req, unparsed);
        res.send(data);
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent saksbehandlingstid feilet: ${prepApiError(err)}`);
        res.status(500).json({ error: 'Kunne ikke hente saksbehandlingstid' });
    }
}

export default withAuthenticatedApi(handler);
