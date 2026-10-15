import { innsyn, k9Sak } from './';
import { initApiClient } from './utils/initApiClient';

export const initK9SakInnsynApiClients = (config: {
    frontendPath: string;
    loginURL: string;
    onUnauthorized?: () => void;
}) => {
    initApiClient(k9Sak.client, config);
    initApiClient(innsyn.client, config);
};
