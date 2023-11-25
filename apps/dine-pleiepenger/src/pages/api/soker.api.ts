import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { createDemoRequestContext, createRequestContext, withAuthenticatedApi } from '../../auth/withAuthentication';
import { Søker } from '../../server/api-models/SøkerSchema';
import { getSøker } from '../../server/innsynService';
import { isForbidden } from '../../utils/apiUtils';
import { isLocal } from '../../utils/env';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const childLogger = createChildLogger(req.headers['x-request-id'] as string);

    try {
        const context = !isLocal
            ? createRequestContext(req.headers['x-request-id'] as string | undefined, req.headers['authorization'])
            : createDemoRequestContext(req);

        if (!context || context === null) {
            res.status(401);
            return;
        }
        res.send(await getSøker(context));
    } catch (err) {
        childLogger.error(`Fetching søker failed: ${err}`);
        if (isForbidden(err)) {
            res.status(403);
        }
        res.status(500).json({ error: 'Kunne ikke hente bruker', err });
    }
}

export default withAuthenticatedApi(handler);

export const søkerFecther = async (url: string) => axios.get<Søker>(url).then((res) => res.data);
