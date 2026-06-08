import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { initUngBrukerdialogApiClient } from '@navikt/ung-brukerdialog-api';

import { setRedirectingToLogin } from '../../sentry/instrument';

export const initApiClients = () => {
    initUngBrukerdialogApiClient({
        frontendPath: getRequiredEnv(EnvKey.UNG_BRUKERDIALOG_API_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
        onUnauthorized: setRedirectingToLogin,
    });

    initK9BrukerdialogProsesseringApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
        onUnauthorized: setRedirectingToLogin,
    });
};
