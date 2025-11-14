import { createChildLogger } from '@navikt/next-logger';
import axios from 'axios';

import { RequestContext } from '../../types/RequestContext';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';

export async function fetchDocumentStream(path: string, context: RequestContext, service: ApiServices): Promise<any> {
    const childLogger = createChildLogger(context.requestId);

    const { url, headers } = await exchangeTokenAndPrepRequest(service, context, path, 'application/pdf');

    childLogger.info(`Fetching document from ${url}`);

    const response = await axios.get(url, {
        responseType: 'stream',
        headers: { ...headers },
    });

    return response.data;
}
