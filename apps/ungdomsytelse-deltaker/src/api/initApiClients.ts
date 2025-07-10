import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { getCommonEnv, getRequiredEnv } from '@navikt/sif-common-env';

export const initApiClients = () => {
    // Initialize the K9 Brukerdialog Prosessering API clients with the required environment variables.
    initK9BrukerdialogProsesseringApiClients(
        getRequiredEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
        getCommonEnv().SIF_PUBLIC_LOGIN_URL,
    );
};
