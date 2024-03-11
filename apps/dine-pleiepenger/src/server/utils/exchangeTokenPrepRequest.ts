import { requestOboToken } from '@navikt/oasis';
import { createChildLogger } from '@navikt/next-logger';
import { browserEnv, getServerEnv, isLocal, ServerEnv } from '../../utils/env';
import { ApiService } from '../apiService';

const getAudienceAndServerUrl = (
    service: ApiService,
    serverEnv: ServerEnv,
): {
    audience: string;
    serverUrl: string;
} => {
    switch (service) {
        case ApiService.k9Brukerdialog:
            return {
                audience: serverEnv.NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE!,
                serverUrl: browserEnv.NEXT_PUBLIC_API_URL_BRUKERDIALOG!,
            };
        case ApiService.k9SakInnsyn:
            return {
                audience: serverEnv.NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE!,
                serverUrl: browserEnv.NEXT_PUBLIC_API_URL_K9_SAK_INNSYN!,
            };
        case ApiService.sifInnsyn:
            return {
                audience: serverEnv.NEXT_PUBLIC_INNSYN_BACKEND_SCOPE!,
                serverUrl: browserEnv.NEXT_PUBLIC_API_URL_INNSYN!,
            };
    }
};

export const exchangeTokenAndPrepRequest = async (
    service: ApiService,
    context,
    path,
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
                'Content-Type': 'application/pdf',
                'x-request-id': context.requestId,
                'X-K9-Brukerdialog': serverEnv.NAIS_CLIENT_ID!,
            },
        };
    }
    return {
        url: `${serverUrl}/${path}`,
        headers: {
            Authorization: `Bearer LOCALHOST`,
            'Content-Type': 'application/pdf',
            'x-request-id': context.requestId,
            'X-K9-Brukerdialog': serverEnv.NAIS_CLIENT_ID!,
        },
    };
};
