import { createChildLogger } from '@navikt/next-logger';
import { requestOboToken } from '@navikt/oasis';

import { browserEnv, getServerEnv, isLocal, ServerEnv } from '../../utils/env';
import { ApiServices } from '../types/ApiServices';
import { validateRelativeApiPath } from './validatePathSegment';

const getAudienceAndServerUrl = (
    service: ApiServices,
    serverEnv: ServerEnv,
): {
    audience: string;
    serverUrl: string;
} => {
    switch (service) {
        case ApiServices.k9Brukerdialog:
            return {
                audience: serverEnv.NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE!,
                serverUrl: browserEnv.NEXT_PUBLIC_API_URL_BRUKERDIALOG!,
            };
        case ApiServices.k9SakInnsyn:
            return {
                audience: serverEnv.NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE!,
                serverUrl: browserEnv.NEXT_PUBLIC_API_URL_K9_SAK_INNSYN!,
            };
        case ApiServices.sifInnsyn:
            return {
                audience: serverEnv.NEXT_PUBLIC_INNSYN_BACKEND_SCOPE!,
                serverUrl: browserEnv.NEXT_PUBLIC_API_URL_INNSYN!,
            };
    }
};

export const exchangeTokenAndPrepRequest = async (
    service: ApiServices,
    context: any,
    path: string,
    contentType: string,
): Promise<{
    headers: any;
    url: string;
}> => {
    // Validerer path for å beskytte mot SSRF - defense in depth
    // Dette sikrer at selv om validering mangler i kall-stedene, så er vi beskyttet
    const safePath = validateRelativeApiPath(path, 'API path');

    const childLogger = createChildLogger(context.requestId);
    const serverEnv = getServerEnv();

    const { audience, serverUrl } = getAudienceAndServerUrl(service, serverEnv);

    // Construct safe URL using URL constructor
    const url = new URL(safePath, serverUrl);

    const baseHeaders = {
        'Content-Type': contentType,
        'x-request-id': context.requestId,
        'X-K9-Brukerdialog': serverEnv.NAIS_CLIENT_ID!,
        'X-Correlation-ID': context.requestId,
    };

    if (!isLocal) {
        childLogger.info(`Exchanging token for ${audience}`);
        const tokenX = await requestOboToken(context.accessToken, audience);
        if (!tokenX.ok) {
            throw new Error(
                `Unable to exchange token for dine-pleiepenger-backend token, requestId: ${context.requestId}, reason: ${tokenX.error.message}`,
            );
        }

        return {
            url: url.toString(),
            headers: {
                ...baseHeaders,
                Authorization: `Bearer ${tokenX.token}`,
            },
        };
    }

    return {
        url: url.toString(),
        headers: baseHeaders,
    };
};
