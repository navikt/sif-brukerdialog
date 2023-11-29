import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';
import { createChildLogger } from '@navikt/next-logger';
import { browserEnv, getServerEnv, isLocal } from '../../utils/env';
import { ApiService } from '../apiService';

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

    const audience =
        service === ApiService.k9Brukerdialog
            ? serverEnv.NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE!
            : serverEnv.NEXT_PUBLIC_INNSYN_BACKEND_SCOPE!;

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

    const serverUrl =
        service === ApiService.k9Brukerdialog
            ? browserEnv.NEXT_PUBLIC_API_URL_BRUKERDIALOG
            : browserEnv.NEXT_PUBLIC_API_URL_INNSYN;

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
