import { client } from '@navikt/k9-brukerdialog-prosessering-api';
import { initApiClient, InitApiClientOptions } from '@navikt/sif-common-api';

export const initSifComonQueryClients = (frontendPath: string, options: InitApiClientOptions) => {
    initApiClient(client, frontendPath, options);
};
