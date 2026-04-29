import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { initK9SakInnsynApiClients } from '@navikt/k9-sak-innsyn-api';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';

import { setRedirectingToLogin } from '../../sentry/instrument';

export const initApiClients = () => {
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
        onUnauthorized: setRedirectingToLogin,
    });

    initK9SakInnsynApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_SAK_INNSYN_FRONTEND_PATH),
        loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL),
        onUnauthorized: setRedirectingToLogin,
    });
};
