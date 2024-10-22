import axios, { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { v4 } from 'uuid';
import { getCommonEnv } from '@navikt/sif-common-env';

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

export const k9BrukerdialogApiClient = axios.create({
    ...axiosConfig,
    baseURL: getCommonEnv().K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
});

/**
 * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
 */
k9BrukerdialogApiClient.interceptors.response.use(
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
k9BrukerdialogApiClient.interceptors.request.use(
    (config) => {
        config.headers.set('X-Correlation-ID', v4());
        return config;
    },
    (error) => Promise.reject(error),
);
