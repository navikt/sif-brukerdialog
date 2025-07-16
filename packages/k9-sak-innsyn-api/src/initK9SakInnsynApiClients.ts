import { k9Sak, innsyn } from '.';
import { initApiClient } from './utils/initApiClient';

export const initK9SakInnsynApiClients = (config: { frontendPath: string; loginURL: string }) => {
    const { frontendPath, loginURL } = config;
    initApiClient(k9Sak.client, frontendPath, loginURL);
    initApiClient(innsyn.client, frontendPath, loginURL);
};
