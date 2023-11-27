import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { Svarfrist } from '../../server/api-models/Svarfrist';
import { fetchSvarfrist } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';

/** Fetcher som kaller denne handleren */
export const svarfristFetcher = async (url: string): Promise<Svarfrist> => axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchSvarfrist(req);
        res.send(data);
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Fetching saksbehandlingstid failed: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saksbehandlingstid', err });
    }
}

export default withAuthenticatedApi(handler);
