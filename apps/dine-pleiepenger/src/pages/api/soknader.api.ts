import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøknader } from '../../server/apiService';
import { sortInnsendtSøknadEtterOpprettetDato } from '../../utils/innsendtSøknadUtils';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetchSøknader(req);
        res.send(response.sort(sortInnsendtSøknadEtterOpprettetDato));
    } catch (err) {
        getLogger(req).error(`Hent søknader feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søknader' });
    }
}

export default withAuthenticatedApi(handler);
