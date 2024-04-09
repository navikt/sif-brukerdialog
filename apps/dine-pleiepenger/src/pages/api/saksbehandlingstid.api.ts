import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaksbehandlingstid } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchSaksbehandlingstid(req);
        res.send(data);
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent saksbehandlingstid feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saksbehandlingstid' });
    }
}

export default withAuthenticatedApi(handler);
