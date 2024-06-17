import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { PleietrengendeMedSak } from '../../server/api-models/PleietrengendeMedSakSchema';
import { fetchSaker } from '../../server/apiService';
import { getLogger } from '../../utils/getLogCorrelationID';

export const sakerFetcher = async (url: string): Promise<PleietrengendeMedSak[]> =>
    axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchSaker(req);
        res.send(data);
    } catch (err) {
        getLogger(req).error(`Hent saker feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saker' });
    }
}

export default withAuthenticatedApi(handler);
