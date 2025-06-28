import { EnvKey, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { initUngDeltakelseOpplyserApiVeilederClient } from '@navikt/ung-deltakelse-opplyser-api-veileder';

export const initApiClients = () => {
    const baseURL = getUngDeltakelseOpplyserBrowserEnv()[EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH];
    initUngDeltakelseOpplyserApiVeilederClient(baseURL, {
        onUnAuthorized: () => {
            window.location.reload();
        },
    });
};
