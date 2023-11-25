import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { createDemoRequestContext, createRequestContext, withAuthenticatedApi } from '../../auth/withAuthentication';
import { getSøknader } from '../../server/innsynService';
import { Søknad } from '../../types/Søknad';
import { isForbidden } from '../../utils/apiUtils';
import { isLocal } from '../../utils/env';
import { sortSøknadEtterOpprettetDato } from '../../utils/søknadUtils';

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
        const response = (await getSøknader(context)).sort(sortSøknadEtterOpprettetDato);
        res.send(response);
    } catch (err) {
        childLogger.error(`Fetching søknader failed: ${err}`);
        if (isForbidden(err)) {
            res.status(403);
        }
        res.status(500).json({ error: 'Kunne ikke hente søknader', err });
    }
}

export default withAuthenticatedApi(handler);

export const søknaderFecther = async (url: string) => axios.get<Søknad[]>(url).then((res) => res.data);
