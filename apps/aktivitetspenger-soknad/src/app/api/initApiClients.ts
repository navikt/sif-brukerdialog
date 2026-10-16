import { initK9BrukerdialogProsesseringApiClients } from '@sif/k9-brukerdialog-prosessering-api';
import { initUngBrukerdialogApiClient } from '@sif/ung-brukerdialog-api';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@sif/ung-deltakelse-opplyser-api-deltaker';
import { EnvKey, getRequiredEnv } from '@sif/env';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiDeltakerClient({
        frontendPath: getRequiredEnv(EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
    });

    initUngBrukerdialogApiClient({
        frontendPath: getRequiredEnv(EnvKey.UNG_BRUKERDIALOG_API_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
    });

    initK9BrukerdialogProsesseringApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
    });
};
