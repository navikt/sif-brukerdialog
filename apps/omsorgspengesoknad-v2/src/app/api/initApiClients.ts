import { EnvKey, getRequiredEnv } from '@sif/env';
import { initK9BrukerdialogProsesseringApiClients } from '@sif/k9-brukerdialog-prosessering-api';
import { initK9SakInnsynApiClients } from '@sif/k9-sak-innsyn-api';

export const initApiClients = () => {
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
    });

    initK9SakInnsynApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_SAK_INNSYN_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
    });
};
