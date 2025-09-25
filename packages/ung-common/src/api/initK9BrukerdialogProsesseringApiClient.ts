import { client } from '@navikt/k9-brukerdialog-prosessering-api/src/generated/ungdomsytelse/client.gen';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { initApiClient, InitApiClientOptions } from '@navikt/sif-common-api';

export const initK9BrukerdialogProsesseringApiClient = (options?: InitApiClientOptions) => {
    const frontendPath = getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH);
    initApiClient(client, frontendPath, options);
};
