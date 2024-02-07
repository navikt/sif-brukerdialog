import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { InnsendtSøknad } from '../../types/Søknad';
import { getXRequestId } from '../../utils/apiUtils';
import { sortSøknadEtterOpprettetDato } from '../../utils/søknadUtils';
import axios from 'axios';
import { fetchSøknader } from '../../server/apiService';

export const søknaderFetcher = async (url: string): Promise<InnsendtSøknad[]> => axios.get(url).then((res) => res.data);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetchSøknader(req);
        res.send(response.sort(sortSøknadEtterOpprettetDato));
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent søknader feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søknader', err });
    }
}

export default withAuthenticatedApi(handler);
