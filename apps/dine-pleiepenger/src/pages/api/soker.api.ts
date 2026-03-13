import * as Sentry from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøker } from '../../server/fetchers/fetchSøker';
import { prepApiError } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        return res.send(await fetchSøker(req, unparsed));
    } catch (err) {
        getLogger(req).error(`Hent søker feilet`, prepApiError(err));

        Sentry.captureException(err, {
            tags: { endpoint: 'soker' },
            extra: { errorDetails: prepApiError(err) },
        });

        return res.status(500).json({ error: 'Kunne ikke hente søker' });
    }
}

export default withAuthenticatedApi(handler);
