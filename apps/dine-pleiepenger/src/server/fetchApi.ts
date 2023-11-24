import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';
import { createChildLogger } from '@navikt/next-logger';
import { RequestContext } from '../types/RequestContext';
import { getServerEnv, isLocal } from '../utils/env';

const serverEnv = getServerEnv();

export async function fetchApi<ResponseObject>(
    method: { type: 'GET' } | { type: 'POST'; body: string | undefined },
    path: string,
    parse: (json?: unknown) => ResponseObject,
    context: RequestContext,
    service: 'k9-brukerdialog-api' | 'sif-innsyn-api',
): Promise<ResponseObject> {
    const childLogger = createChildLogger(context.requestId);

    const serverUrl =
        service === 'k9-brukerdialog-api'
            ? serverEnv.NEXT_PUBLIC_API_URL_INNSYN!
            : serverEnv.NEXT_PUBLIC_API_URL_BRUKERDIALOG!;

    let tokenX;

    if (!isLocal) {
        childLogger.info(`Exchanging token for ${serverUrl}`);
        tokenX = await grantTokenXOboToken(context.accessToken, serverUrl);
        if (isInvalidTokenSet(tokenX)) {
            throw new Error(
                `Unable to exchange token for dine-pleiepenger-backend token, requestId: ${context.requestId}, reason: ${tokenX.message}`,
            );
        }
    }

    const response = await fetch(`${serverUrl}/${path}`, {
        method: method.type,
        body: method.type === 'POST' ? method.body : undefined,
        headers: {
            Authorization: `Bearer ${tokenX}`,
            'Content-Type': 'application/json',
            'x-request-id': context.requestId,
        },
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

    throw new Error(
        `API (${path}) responded with status ${response.status} ${response.statusText}, requestId: ${context.requestId}`,
    );
}
