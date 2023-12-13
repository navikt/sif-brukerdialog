import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';
import { RequestContext } from '../types/RequestContext';
import { ApiService } from './apiService';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';

export async function fetchDocument(path: string, context: RequestContext, service: ApiService): Promise<any> {
    const childLogger = createChildLogger(context.requestId);

    const { url, headers } = await exchangeTokenAndPrepRequest(service, context, path);

    childLogger.info(`Fetching document from ${url}`);

    const response = await axios.get(url, {
        responseType: 'document',
        headers: { ...headers },
    });

    return response.data;
}
