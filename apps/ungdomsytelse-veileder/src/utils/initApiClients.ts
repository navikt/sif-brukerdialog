import { EnvKey, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { initUngDeltakelseOpplyserApiVeilederClient } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { getAppEnv } from './appEnv';

export const initApiClients = () => {
    const frontendPath = getUngDeltakelseOpplyserBrowserEnv()[EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH];
    const apiBaseUrl = getAppEnv()['SIF_PUBLIC_API_BASE_URL'];
    const baseURL = `${apiBaseUrl}${frontendPath}`;

    initUngDeltakelseOpplyserApiVeilederClient(baseURL, {
        onUnAuthorized: () => {
            window.location.reload();
        },
    });
};
