import type { NextApiRequest, NextApiResponse } from 'next';
import { isAxiosError } from 'axios';
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
        res.status(500).json({
            error: 'Kunne ikke hente saker-raw',
            message: JSON.stringify({
                message: err.message,
                name: err.name,
                cause: err.cause,
                code: err.code,
                status: err.status,
            }),
        });
    }
}

export default withAuthenticatedApi(handler);
