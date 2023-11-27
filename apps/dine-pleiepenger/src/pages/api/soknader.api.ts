import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchApi } from '../../server/fetchApi';
import { ApiEndpointInnsyn, ApiService } from '../../server/types';
import { Søknad } from '../../types/Søknad';
import { getContextForApiHandler, getXRequestId } from '../../utils/apiUtils';
import { sortSøknadEtterOpprettetDato } from '../../utils/søknadUtils';

export const søknaderFecther = async (url: string): Promise<Søknad[]> => fetch(url).then((res) => res.json());

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetchApi(
            { type: 'GET' },
            ApiEndpointInnsyn.søknad,
            (it) => it as Søknad[],
            getContextForApiHandler(req),
            ApiService.sifInnsyn,
        );
        res.send(response.sort(sortSøknadEtterOpprettetDato));
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Fetching søknader failed: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søknader', err });
    }
}

export default withAuthenticatedApi(handler);
