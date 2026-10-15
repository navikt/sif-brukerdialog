import { initApiClient } from '@sif/api-client';
import { client } from './deltaker/client/client.gen';

interface InitOptions {
    frontendPath: string;
    loginURL: string;
    onUnauthorized?: () => void;
}

export const initUngDeltakelseOpplyserApiDeltakerClient = (options: InitOptions) => {
    initApiClient(client, options);
};
