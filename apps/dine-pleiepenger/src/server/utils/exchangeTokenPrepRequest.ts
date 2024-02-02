import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';
import { createChildLogger } from '@navikt/next-logger';
import { browserEnv, getServerEnv, isLocal, ServerEnv } from '../../utils/env';
import { ApiService } from '../apiService';

const getServerUrl = (service: ApiService): string => {
    switch (service) {
        case ApiService.k9Brukerdialog:
            return browserEnv.NEXT_PUBLIC_API_URL_BRUKERDIALOG!;
        case ApiService.k9SakInnsyn:
            return browserEnv.NEXT_PUBLIC_API_URL_INNSYN!;
        case ApiService.sifInnsyn:
            return browserEnv.NEXT_PUBLIC_API_URL_K9_SAK_INNSYN!;
    }
};
const getAudience = (service: ApiService, serverEnv: ServerEnv): string => {
    switch (service) {
        case ApiService.k9Brukerdialog:
            return serverEnv.NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE!;
        case ApiService.k9SakInnsyn:
            return serverEnv.NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE!;
        case ApiService.sifInnsyn:
            return serverEnv.NEXT_PUBLIC_INNSYN_BACKEND_SCOPE!;
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

    const audience = getAudience(service, serverEnv);

    let tokenX;

    if (!isLocal) {
        childLogger.info(`Exchanging token for ${audience}`);
        tokenX = await grantTokenXOboToken(context.accessToken, audience);
        if (isInvalidTokenSet(tokenX)) {
            throw new Error(
                `Unable to exchange token for dine-pleiepenger-backend token, requestId: ${context.requestId}, reason: ${tokenX.message}`,
            );
        }
    }

    const serverUrl = getServerUrl(service);

    return {
        url: `${serverUrl}/${path}`,
        headers: {
            Authorization: `Bearer ${tokenX}`,
            'Content-Type': 'application/pdf',
            'x-request-id': context.requestId,
            'X-K9-Brukerdialog': serverEnv.NAIS_CLIENT_ID!,
        },
    };
};
