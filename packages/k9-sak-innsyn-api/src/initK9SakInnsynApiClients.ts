import { k9Sak, innsyn } from '.';
import { initApiClient } from './utils/initApiClient';

export const initK9SakInnsynApiClients = (frontendPath: string, loginURL: string) => {
    initApiClient(k9Sak.client, frontendPath, loginURL);
    initApiClient(innsyn.client, frontendPath, loginURL);
};
