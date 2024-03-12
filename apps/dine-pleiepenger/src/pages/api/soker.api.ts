import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { Søker } from '../../server/api-models/SøkerSchema';
import { fetchSøker } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';

export const søkerFetcher = async (url: string): Promise<Søker> => axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.send(await fetchSøker(req));
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent søker feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søker' });
    }
}

export default withAuthenticatedApi(handler);
