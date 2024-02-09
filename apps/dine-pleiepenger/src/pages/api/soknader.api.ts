import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøknader } from '../../server/apiService';
import { getXRequestId } from '../../utils/apiUtils';
import { sortInnsendtSøknadEtterOpprettetDato } from '../../utils/innsendtSøknadUtils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetchSøknader(req);
        res.send(response.sort(sortInnsendtSøknadEtterOpprettetDato));
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent søknader feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente søknader', err });
    }
}

export default withAuthenticatedApi(handler);
