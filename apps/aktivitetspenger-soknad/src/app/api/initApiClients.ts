import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { setRedirectingToLogin } from '@navikt/sif-common-sentry';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

import { AppEnv } from '../../../env.schema';

export const initApiClients = (env: AppEnv) => {
    initUngDeltakelseOpplyserApiDeltakerClient({
        frontendPath: env.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH,
        loginURL: env.SIF_PUBLIC_LOGIN_URL,
        onUnauthorized: setRedirectingToLogin,
    });

    initK9BrukerdialogProsesseringApiClients({
        frontendPath: env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        loginURL: env.SIF_PUBLIC_LOGIN_URL,
        onUnauthorized: setRedirectingToLogin,
    });
};
