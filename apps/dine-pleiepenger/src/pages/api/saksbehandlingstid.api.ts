import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { Saksbehandlingstid } from '../../server/api-models/SaksbehandlingstidSchema';
import { fetchSaksbehandlingstid } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';

export const saksbehandlingstidFetcher = async (url: string): Promise<Saksbehandlingstid> =>
    axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchSaksbehandlingstid(req);
        res.send(data);
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent saksbehandlingstid feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saksbehandlingstid', err });
    }
}

export default withAuthenticatedApi(handler);
