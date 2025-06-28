import { EnvKey, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import { initK9BrukerdialogProsesseringApiClient } from '@navikt/ung-common';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const initApiClients = () => {
    const baseURL = getUngDeltakelseOpplyserBrowserEnv()[EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH];
    initUngDeltakelseOpplyserApiDeltakerClient(baseURL, {
        onUnAuthorized: () => {
            window.location.reload();
        },
    });
    initK9BrukerdialogProsesseringApiClient();
};
