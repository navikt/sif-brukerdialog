import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSaker } from '../../server/apiService';
import { getLogger } from '../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchSaker(req, true);
        res.json(data);
    } catch (err) {
        if (isAxiosError(err)) {
            getLogger(req).error(
                `Hent saker-raw feilet: ${JSON.stringify({ message: err.message, name: err.name, cause: err.cause, code: err.code, status: err.status })}`,
            );
        }
        const anyErr: any = err;
        res.status(500).json({
            error: 'Kunne ikke hente saker-raw',
            message: JSON.stringify({
                message: anyErr.message,
                name: anyErr.name,
                cause: anyErr.cause,
                code: anyErr.code,
                status: anyErr.status,
            }),
        });
    }
}

export default withAuthenticatedApi(handler);
