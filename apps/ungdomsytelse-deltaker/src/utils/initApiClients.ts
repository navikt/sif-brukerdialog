import { EnvKey, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import {
    initK9BrukerdialogProsesseringApiClient,
    initK9BrukerdialogProsesseringUngdomsytelseApiClient,
} from '@navikt/ung-common';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { getAppEnv } from './appEnv';

export const initApiClients = () => {
    const frontendPath = getUngDeltakelseOpplyserBrowserEnv()[EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH];
    const apiBaseUrl = getAppEnv()['SIF_PUBLIC_API_BASE_URL'];
    const baseURL = `${apiBaseUrl}${frontendPath}`;

    initUngDeltakelseOpplyserApiDeltakerClient(baseURL, {
        onUnAuthorized: () => {
            window.location.reload();
        },
    });
    initK9BrukerdialogProsesseringApiClient();
    initK9BrukerdialogProsesseringUngdomsytelseApiClient();
};
