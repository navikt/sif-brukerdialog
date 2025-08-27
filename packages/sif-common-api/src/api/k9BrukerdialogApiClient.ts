import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { v4 } from 'uuid';

export const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;

export const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosMultipartConfig: AxiosRequestConfig = {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' },
};

let k9BrukerdialogApiClientInstance: AxiosInstance | undefined;

/**
 * Henter eller oppretter k9BrukerdialogApiClient ved behov.
 * Dette unngår global initialisering som kan feile hvis miljøvariabler ikke er tilgjengelige.
 */
export const getK9BrukerdialogApiClient = (): AxiosInstance => {
    if (!k9BrukerdialogApiClientInstance) {
        k9BrukerdialogApiClientInstance = axios.create({
            ...axiosConfig,
            baseURL: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        });

        /**
         * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
         */
        k9BrukerdialogApiClientInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (isUnauthorized(error)) {
                    window.location.assign(getRequiredEnv(EnvKey.SIF_PUBLIC_LOGIN_URL));
                }
                return Promise.reject(error);
            },
        );

        /**
         * Legg på X-Correlation-ID til alle requests for å kunne spore en request gjennom systemet.
         */
        k9BrukerdialogApiClientInstance.interceptors.request.use(
            (config) => {
                config.headers.set('X-Correlation-ID', v4());
                return config;
            },
            (error) => Promise.reject(error),
        );
    }

    return k9BrukerdialogApiClientInstance;
};
