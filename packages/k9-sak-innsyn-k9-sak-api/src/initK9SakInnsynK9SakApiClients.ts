import { client } from '.';
import { initApiClient, InitApiClientOptions } from '@navikt/sif-common-api';

export const initK9SakInnsynK9SakApiClients = (frontendPath: string, options: InitApiClientOptions) => {
    initApiClient(client, frontendPath, options);
};
