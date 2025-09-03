import { client } from '@navikt/k9-brukerdialog-prosessering-api/src/generated/ungdomsytelse/client.gen';
import { initApiClient } from '@navikt/sif-common-api';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';

export const initK9BrukerdialogProsesseringUngdomsytelseApiClient = () => {
    const frontendPath = getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH);
    initApiClient(client, frontendPath, { loginURL: getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL) });
};
