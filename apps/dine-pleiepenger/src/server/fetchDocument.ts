import { createChildLogger } from '@navikt/next-logger';
import { RequestContext } from '../types/RequestContext';
import { ApiService } from './apiService';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';

export async function fetchDocument(path: string, context: RequestContext, service: ApiService): Promise<Blob> {
    const childLogger = createChildLogger(context.requestId);

    const { url, headers } = await exchangeTokenAndPrepRequest(service, context, path, 'application/pdf');

    childLogger.info(`Fetching document from ${url}`);

    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`Unexpected response fetching PDF ${response.statusText}`);
    }
    return await response.blob();
}
