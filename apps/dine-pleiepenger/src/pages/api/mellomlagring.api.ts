import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchMellomlagringer } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.send(await fetchMellomlagringer(req));
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent mellomlagring feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente mellomlagring', err });
    }
}

export default withAuthenticatedApi(handler);
