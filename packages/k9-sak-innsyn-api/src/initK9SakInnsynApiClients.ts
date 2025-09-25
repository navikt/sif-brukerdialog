import { initApiClient, InitApiClientOptions } from '@navikt/sif-common-api';

import { innsyn, k9Sak } from './';

export const initK9SakInnsynApiClients = (frontendPath: string, options: InitApiClientOptions) => {
    initApiClient(k9Sak.client, frontendPath, options);
    initApiClient(innsyn.client, frontendPath, options);
};
