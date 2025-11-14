import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøknader } from '../../server/api-requests/fetchSøknader';
import { getLogger } from '../../utils/getLogCorrelationID';
import { sortInnsendtSøknadEtterOpprettetDato } from '../../utils/innsendtSøknadUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const raw = req.query.raw === 'true';
        const response = await fetchSøknader(req, raw);
        res.send(response.sort(sortInnsendtSøknadEtterOpprettetDato));
    } catch (err) {
        getLogger(req).error(`Hent søknader feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søknader' });
    }
}

export default withAuthenticatedApi(handler);
