import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSakerMetadata } from '../../server/fetchers/fetchSakerMetadata';
import { getLogger } from '../../utils/getLogger';
import { logApiError } from '../../utils/apiErrorLogger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        const data = await fetchSakerMetadata(req, unparsed);
        return res.send(data);
    } catch (err) {
        getLogger(req).error('Hent saker feilet');
        logApiError(err, 'saker-metadata');
        return res.status(500).json({ error: 'Kunne ikke hente saker' });
    }
}

export default withAuthenticatedApi(handler);
