import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaker } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';
import { PleietrengendeMedSak } from '../../server/api-models/PleietrengendeMedSakSchema';

export const sakerFetcher = async (url: string): Promise<PleietrengendeMedSak[]> =>
    axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchSaker(req);
        res.send(data);
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent saker feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saker', err });
    }
}

export default withAuthenticatedApi(handler);
