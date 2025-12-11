import { createChildLogger } from '@navikt/next-logger';

import { RequestContext } from '../../types/RequestContext';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';

export async function fetchDocumentStream(
    path: string,
    context: RequestContext,
    service: ApiServices,
): Promise<ReadableStream<Uint8Array>> {
    const childLogger = createChildLogger(context.requestId);

    const { url, headers } = await exchangeTokenAndPrepRequest(service, context, path, 'application/pdf');

    childLogger.info(`Fetching document stream`);

    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`Unexpected response fetching PDF: ${response.statusText}`);
    }

    if (!response.body) {
        throw new Error('Response body is empty');
    }

    return response.body;
}
