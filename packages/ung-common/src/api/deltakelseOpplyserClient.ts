import { isUnauthorized } from '@navikt/sif-common-api';
import { getCommonEnv, getUngDeltakelseOpplyserBrowserEnv } from '@navikt/sif-common-env';
import axios, { AxiosRequestConfig } from 'axios';
import { v4 } from 'uuid';

const env = getUngDeltakelseOpplyserBrowserEnv();

const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const ungDeltakelseOpplyserApiClient = axios.create({
    ...axiosConfig,
    baseURL: env.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH,
});

/**
 * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
 */
ungDeltakelseOpplyserApiClient.interceptors.response.use(
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
ungDeltakelseOpplyserApiClient.interceptors.request.use(
    (config) => {
        config.headers.set('X-Correlation-ID', v4());
        return config;
    },
    (error) => Promise.reject(error),
);
