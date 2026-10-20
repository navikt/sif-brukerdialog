import { initApiClient } from '@sif/api-client';
import { EnvKey, getSifInnsynBrowserEnv } from '@sif/env';
import { AxiosError } from 'axios';

import { client } from './sif-innsyn-api/client/client.gen';

interface InitOptions {
    onUnAuthorized?: () => void;
    isUnauthorized?: (error: AxiosError) => boolean;
    headers?: Record<string, string>;
}

export const initSifInnsynApiClient = (options?: InitOptions) => {
    initApiClient(client, {
        frontendPath: getSifInnsynBrowserEnv()[EnvKey.SIF_INNSYN_FRONTEND_PATH],
        loginURL: '',
        onUnauthorized: options?.onUnAuthorized,
        headers: options?.headers,
        isUnauthorized: options?.isUnauthorized ?? (() => false),
        redirectOnUnauthorized: false,
    });
};
