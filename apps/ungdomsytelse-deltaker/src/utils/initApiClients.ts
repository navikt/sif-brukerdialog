import { EnvKey, getCommonEnv } from '@navikt/sif-common-env';
import { initK9BrukerdialogProsesseringApiClient, initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';
import { getMockRequestHeaders } from '../../mock/utils/mockUtils';

export const initApiClients = () => {
    const devHeaders = ['msw', 'e2e'].includes(import.meta.env.MODE) ? getMockRequestHeaders() : undefined;
    initUngDeltakelseOpplyserApiClient({
        onUnAuthorized: () => {
            window.location.assign(getCommonEnv()[EnvKey.SIF_PUBLIC_LOGIN_URL]);
        },
        headers: devHeaders,
    });
    initK9BrukerdialogProsesseringApiClient({ headers: devHeaders });
};
