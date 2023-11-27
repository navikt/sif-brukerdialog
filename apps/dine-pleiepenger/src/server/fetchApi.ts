import { createChildLogger } from '@navikt/next-logger';
import { RequestContext } from '../types/RequestContext';
import { exchangeTokenAndPrepRequest } from './utils/exchangeTokenPrepRequest';
import { ApiService } from './types';

export async function fetchApi<ResponseObject>(
    method: { type: 'GET' } | { type: 'POST'; body: string | undefined },
    path: string,
    parse: (json?: unknown) => ResponseObject,
    context: RequestContext,
    service: ApiService,
): Promise<ResponseObject> {
    const childLogger = createChildLogger(context.requestId);
    const { url, headers } = await exchangeTokenAndPrepRequest(service, context, path);

    childLogger.info(`Fetching ${url}`);

    const response = await fetch(url, {
        method: method.type,
        body: method.type === 'POST' ? method.body : undefined,
        headers,
    });

    if (response.ok) {
        try {
            const data = await response.json();
            return await parse(data);
        } catch (e) {
            childLogger.error(`Failed to parse JSON from ${path}, error: ${e}, requestId: ${context.requestId}`);
            throw e;
        }
    }

    if (response.status === 401) {
        throw new Error(`User has been logged out, requestId: ${context.requestId}`);
    }

    if (response.status === 403) {
        throw new Error(`User has no access, requestId: ${context.requestId}`);
    }

    throw new Error(
        `API (${path}) responded with status ${response.status} ${response.statusText}, requestId: ${context.requestId}`,
    );
}
