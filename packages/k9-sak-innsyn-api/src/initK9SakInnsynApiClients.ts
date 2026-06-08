import { innsyn, k9Sak } from './';
import { initApiClient } from './utils/initApiClient';

export const initK9SakInnsynApiClients = (config: {
    frontendPath: string;
    loginURL: string;
    onUnauthorized?: () => void;
}) => {
    const { frontendPath, loginURL, onUnauthorized } = config;
    initApiClient(k9Sak.client, frontendPath, loginURL, onUnauthorized);
    initApiClient(innsyn.client, frontendPath, loginURL, onUnauthorized);
};
