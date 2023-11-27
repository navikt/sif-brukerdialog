import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { Søker } from '../../server/api-models/Søker';
import { fetchSøker } from '../../server/innsynService';
import { getXRequestId } from '../../utils/apiUtils';

export const søkerFetcher = async (url: string): Promise<Søker> => axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.send(await fetchSøker(req));
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Fetching søker failed: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente bruker', err });
    }
}

export default withAuthenticatedApi(handler);
