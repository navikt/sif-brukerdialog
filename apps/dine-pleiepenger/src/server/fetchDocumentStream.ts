import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';
import { createChildLogger } from '@navikt/next-logger';
import { RequestContext } from '../types/RequestContext';
import { browserEnv, getServerEnv, isLocal } from '../utils/env';
import axios from 'axios';

export async function fetchDocumentStream(
    path: string,
    context: RequestContext,
    service: 'k9-brukerdialog-api' | 'sif-innsyn-api',
): Promise<any> {
    const serverEnv = getServerEnv();
    const childLogger = createChildLogger(context.requestId);

    const audience =
        service === 'k9-brukerdialog-api'
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
        service === 'k9-brukerdialog-api'
            ? browserEnv.NEXT_PUBLIC_API_URL_BRUKERDIALOG!
            : browserEnv.NEXT_PUBLIC_API_URL_INNSYN;

    const fetchUrl = `${serverUrl}/${path}`;

    childLogger.info(`Fetching ${fetchUrl}`);

    const response = await axios.get(fetchUrl, {
        responseType: 'stream',
        headers: {
            Authorization: `Bearer ${tokenX}`,
            'Content-Type': 'application/pdf',
            'x-request-id': context.requestId,
            'X-K9-Brukerdialog': serverEnv.NAIS_CLIENT_ID!,
        },
    });

    return response.data;
}
