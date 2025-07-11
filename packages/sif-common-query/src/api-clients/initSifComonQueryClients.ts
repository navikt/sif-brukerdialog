import { client } from '@navikt/k9-brukerdialog-prosessering-api';
import { initApiClient } from './initApiClient';

export const initSifComonQueryClients = (frontendPath: string, loginURL: string) => {
    initApiClient(client, frontendPath, loginURL);
};
