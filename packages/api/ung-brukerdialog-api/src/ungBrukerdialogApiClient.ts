import { initApiClient } from '@sif/api-client';
import { client } from './ung-brukerdialog-api';

interface InitOptions {
    frontendPath: string;
    loginURL: string;
    onUnauthorized?: () => void;
}

export const initUngBrukerdialogApiClient = (options: InitOptions) => {
    initApiClient(client, options);
};
