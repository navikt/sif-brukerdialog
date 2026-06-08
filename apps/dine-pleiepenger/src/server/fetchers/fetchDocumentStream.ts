import { NextApiRequest } from 'next';

import { getContextForApiHandler, prepApiError } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { validateRelativeApiPath } from '../utils/validatePathSegment';

export async function fetchDocumentStream(
    path: string,
    req: NextApiRequest,
    service: ApiServices,
): Promise<ReadableStream<Uint8Array>> {
    const logger = getLogger(req).withContext({ operation: 'fetchDocumentStream' });
    const context = getContextForApiHandler(req);
    const safePath = validateRelativeApiPath(path);
    const { url, headers } = await exchangeTokenAndPrepRequest(service, context, safePath, 'application/pdf');

    try {
        logger.info('Henter dokumentstream fra upstream');
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(
                `Unexpected response fetching PDF (status ${response.status} ${response.statusText}) for path ${safePath}`,
            );
        }

        if (!response.body) {
            throw new Error('Response body is empty');
        }

        logger.info('Dokumentstream hentet');
        return response.body;
    } catch (error) {
        logger.error('Feil ved henting av dokumentstream', prepApiError(error));
        throw error;
    }
}
