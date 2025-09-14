import { initApiClient, InitApiClientOptions } from '@navikt/sif-common-api';

import { client } from '.';

export const initK9SakInnsynK9SakApiClients = (frontendPath: string, options: InitApiClientOptions) => {
    initApiClient(client, frontendPath, options);
};
