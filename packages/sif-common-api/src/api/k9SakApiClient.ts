import { getCommonEnv, getK9SakInnsynEnv } from '@sif/env';
import axios from 'axios';
import { v4 } from 'uuid';

import { axiosConfig, isUnauthorized } from './apiClient';

export const k9SakApiClient = axios.create({
    ...axiosConfig,
    baseURL: getK9SakInnsynEnv().K9_SAK_INNSYN_FRONTEND_PATH,
});

/**
 * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
 */
k9SakApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isUnauthorized(error)) {
            window.location.assign(getCommonEnv().SIF_PUBLIC_LOGIN_URL);
        }
        return Promise.reject(error);
    },
);

/**
 * Legg på X-Correlation-ID til alle requests for å kunne spore en request gjennom systemet.
 */
k9SakApiClient.interceptors.request.use(
    (config) => {
        config.headers.set('X-Correlation-ID', v4());
        return config;
    },
    (error) => Promise.reject(error),
);
