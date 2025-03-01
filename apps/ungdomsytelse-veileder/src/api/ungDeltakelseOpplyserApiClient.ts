import { getCommonEnv, getMaybeEnv } from '@navikt/sif-common-env';
import { isUnauthorized } from '@navikt/sif-common-api';
import { client } from '@navikt/ung-deltakelse-opplyser-hey-api/src/client/client.gen';
import axios, { AxiosRequestConfig } from 'axios';
import { v4 } from 'uuid';

const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const ungDeltakelseOpplyserApiClient = axios.create({
    ...axiosConfig,
    baseURL: getMaybeEnv('UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH'),
});

/** Set config for generert klient */
client.setConfig({
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    baseURL: getMaybeEnv('UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH'),
});

/**
 * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
 */
client.instance.interceptors.response.use(
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
client.instance.interceptors.request.use(
    (config) => {
        config.headers.set('X-Correlation-ID', v4());
        return config;
    },
    (error) => Promise.reject(error),
);
