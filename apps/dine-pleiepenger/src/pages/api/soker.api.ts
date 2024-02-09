import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøker } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.send(await fetchSøker(req));
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent søker feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søker', err });
    }
}

export default withAuthenticatedApi(handler);
