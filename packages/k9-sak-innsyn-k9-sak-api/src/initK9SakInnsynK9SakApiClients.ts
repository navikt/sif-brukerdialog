import { client } from '.';
import { initApiClient } from './utils/initApiClient';

export const initK9SakInnsynK9SakApiClients = (config: { frontendPath: string; loginURL: string }) => {
    const { frontendPath, loginURL } = config;
    initApiClient(client, frontendPath, loginURL);
};
