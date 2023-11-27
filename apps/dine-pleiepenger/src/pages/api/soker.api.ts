import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { Søker, SøkerSchema } from '../../server/api-models/Søker';
import { fetchApi } from '../../server/fetchApi';
import { ApiEndpointBrukerdialog, ApiService } from '../../server/types';
import { getContextForApiHandler, getXRequestId } from '../../utils/apiUtils';

export const søkerFetcher = async (url: string): Promise<Søker> => fetch(url).then((res) => res.json());

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetchApi(
            { type: 'GET' },
            ApiEndpointBrukerdialog.søker,
            (it) => SøkerSchema.parse(it),
            getContextForApiHandler(req),
            ApiService.k9Brukerdialog,
        );
        res.send(response);
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Fetching søker failed: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente bruker', err });
    }
}

export default withAuthenticatedApi(handler);
