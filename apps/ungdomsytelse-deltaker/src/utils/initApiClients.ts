import { EnvKey, getCommonEnv } from '@navikt/sif-common-env';
import { initK9BrukerdialogProsesseringApiClient, initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiClient({
        onUnAuthorized: () => {
            window.location.assign(getCommonEnv()[EnvKey.SIF_PUBLIC_LOGIN_URL]);
        },
    });
    initK9BrukerdialogProsesseringApiClient();
};
