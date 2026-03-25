import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { initUngBrukerdialogApiClient } from '@navikt/ung-brukerdialog-api';

export const initApiClients = () => {
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
