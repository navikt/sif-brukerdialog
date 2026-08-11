import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøker } from '../../server/fetchers/fetchSøker';
import { getLogger } from '../../utils/getLogger';
import { logApiError } from '../../utils/apiErrorLogger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        return res.send(await fetchSøker(req, unparsed));
    } catch (err) {
        getLogger(req).error('Hent søker feilet');
        logApiError(err, 'soker');
        return res.status(500).json({ error: 'Kunne ikke hente søker' });
    }
}

export default withAuthenticatedApi(handler);
