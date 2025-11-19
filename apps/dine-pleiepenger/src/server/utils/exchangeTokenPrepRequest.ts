import { createChildLogger } from '@navikt/next-logger';
import { requestOboToken } from '@navikt/oasis';

import { browserEnv, getServerEnv, isLocal, ServerEnv } from '../../utils/env';
import { ApiServices } from '../types/ApiServices';

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
    const childLogger = createChildLogger(context.requestId);
    const serverEnv = getServerEnv();

    const { audience, serverUrl } = getAudienceAndServerUrl(service, serverEnv);

    if (!isLocal) {
        childLogger.info(`Exchanging token for ${audience}`);
        const tokenX = await requestOboToken(context.accessToken, audience);
        if (!tokenX.ok) {
            throw new Error(
                `Unable to exchange token for dine-pleiepenger-backend token, requestId: ${context.requestId}, reason: ${tokenX.error.message}`,
            );
        }

        return {
            url: `${serverUrl}/${path}`,
            headers: {
                Authorization: `Bearer ${tokenX.token}`,
                'Content-Type': contentType,
                'x-request-id': context.requestId,
                'X-K9-Brukerdialog': serverEnv.NAIS_CLIENT_ID!,
                'X-Correlation-ID': context.requestId,
            },
        };
    }
    return {
        url: `${serverUrl}/${path}`,
        headers: {
            'Content-Type': contentType,
            'x-request-id': context.requestId,
            'X-K9-Brukerdialog': serverEnv.NAIS_CLIENT_ID!,
            'X-Correlation-ID': context.requestId,
        },
    };
};
