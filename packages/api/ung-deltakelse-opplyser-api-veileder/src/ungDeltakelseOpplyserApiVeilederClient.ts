import { initApiClient } from '@sif/api-client';
import { EnvKey, getUngDeltakelseOpplyserBrowserEnv } from '@sif/env';
import { AxiosError } from 'axios';

import { client } from './veileder';

interface InitOptions {
    onUnauthorized?: () => void;
    isUnauthorized?: (error: AxiosError) => boolean;
    headers?: Record<string, string>;
}

export const initUngDeltakelseOpplyserApiVeilederClient = (options?: InitOptions) => {
    initApiClient(client, {
        frontendPath: getUngDeltakelseOpplyserBrowserEnv()[EnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH],
        loginURL: '',
        headers: options?.headers,
        onUnauthorized: options?.onUnauthorized,
        isUnauthorized: options?.isUnauthorized ?? (() => false),
        redirectOnUnauthorized: false,
    });
};
