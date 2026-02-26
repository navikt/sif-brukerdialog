import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { getCommonEnv } from '@navikt/sif-common-env';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiDeltakerClient({
        onUnAuthorized: () => {
            globalThis.location.reload();
        },
    });
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: getCommonEnv().K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        loginURL: getCommonEnv().SIF_PUBLIC_LOGIN_URL,
    });
};
