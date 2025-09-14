import { client } from '@navikt/k9-brukerdialog-prosessering-api';

import { initApiClient } from './initApiClient';

export const initSifComonQueryClients = (config: { frontendPath: string; loginURL: string }) => {
    const { frontendPath, loginURL } = config;
    initApiClient(client, frontendPath, loginURL);
};
