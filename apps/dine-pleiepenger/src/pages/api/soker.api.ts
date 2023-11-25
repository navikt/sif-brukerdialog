import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { Søker } from '../../server/api-models/SøkerSchema';
import { getSøker } from '../../server/innsynService';
import { getContextForApiHandler, getXRequestId, isForbidden } from '../../utils/apiUtils';

export const søkerFetcher = async (url: string): Promise<Søker> => fetch(url).then((res) => res.json());

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.send(await getSøker(getContextForApiHandler(req)));
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Fetching søker failed: ${err}`);
        if (isForbidden(err)) {
            res.status(403);
        }
        res.status(500).json({ error: 'Kunne ikke hente bruker', err });
    }
}

export default withAuthenticatedApi(handler);
