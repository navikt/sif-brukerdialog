import { EnvKey, getRequiredEnv } from '@sif/env';
import { initK9BrukerdialogProsesseringApiClients } from '@sif/k9-brukerdialog-prosessering-api';

export const initApiClients = () => {
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
    });
};
