import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createDemoRequestContext, createRequestContext, withAuthenticatedApi } from '../../auth/withAuthentication';
import { Søker } from '../../types/Søker';
import { isForbidden } from '../../utils/apiUtils';
import { getSøker } from '../../server/innsynService';
import { isLocal } from '../../utils/env';
import { createChildLogger } from '@navikt/next-logger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const childLogger = createChildLogger(req.headers['x-request-id'] as string);

    try {
        const context = !isLocal
            ? createRequestContext(req.headers['x-request-id'] as string | undefined, req.headers['authorization'])
            : createDemoRequestContext(req);

        if (!context || context === null) {
            res.status(401).json({ error: 'Access denied - context is undefined' });
            return;
        }
        const response = await getSøker(context);
        res.send(response);
    } catch (err) {
        childLogger.error(`Fetching søker failed: ${err}`);
        if (isForbidden(err)) {
            res.status(403).json({ error: 'Bruker har ikke tilgang' });
        }
        res.status(500).json({ error: 'Kunne ikke hente bruker', err });
    }
}

export default withAuthenticatedApi(handler);

export const søkerFecther = async (url: string) => axios.get<Søker>(url).then((res) => res.data);
