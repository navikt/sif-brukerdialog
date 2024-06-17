import type { NextApiRequest, NextApiResponse } from 'next';
import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchMellomlagringer } from '../../server/apiService';
import { Mellomlagringer } from '../../types/Mellomlagring';
import { getLogger } from '../../utils/getLogCorrelationID';

export const mellomlagringFetcher = async (url: string): Promise<Mellomlagringer> =>
    axios.get(url, { transformResponse: storageParser }).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.send(await fetchMellomlagringer(req));
    } catch (err) {
        getLogger(req).error(`Hent mellomlagring feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente mellomlagring' });
    }
}

export default withAuthenticatedApi(handler);
