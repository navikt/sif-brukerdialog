import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { initUngBrukerdialogApiClient } from '@navikt/ung-brukerdialog-api';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiDeltakerClient({
        onUnAuthorized: () => {
            globalThis.location.reload();
        },
    });

    initUngBrukerdialogApiClient({
        onUnAuthorized: () => {
            globalThis.location.reload();
        },
    });
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        loginURL: '#',
    });
};
