import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import { commonEnv } from '@navikt/sif-common-env';
import { RequestStatus } from '@types';
import axios, { AxiosError, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { relocateToLoginPage } from '../utils/navigationUtils';
import { ApiEndpointInnsyn, ApiEndpointPsb } from './endpoints';

export * from './endpoints';

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: true,
};

export const axiosConfigPsb: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: commonEnv.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
};

const axiosConfigInnsyn: AxiosRequestConfig = {
    ...axiosConfigCommon,
    transformResponse: storageParser,
    baseURL: commonEnv.SIF_INNSYN_FRONTEND_PATH,
};

axios.interceptors.request.use((config) => {
    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (isUnauthorized(error)) {
            relocateToLoginPage();
            return Promise.reject({
                status: RequestStatus.redirectingToLogin,
            });
        }
        return Promise.reject(error);
    },
);

const api = {
    innsyn: {
        get: <ResponseType>(endpoint: ApiEndpointInnsyn, paramString?: string) => {
            const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
            return axios.get<ResponseType>(url, axiosConfigInnsyn);
        },
    },
    psb: {
        get: <ResponseType>(endpoint: ApiEndpointPsb, paramString?: string, config?: AxiosRequestConfig) => {
            const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
            return axios.get<ResponseType>(url, config || axiosConfigPsb);
        },
        post: <DataType = any, ResponseType = any>(
            endpoint: ApiEndpointPsb,
            data: DataType,
            headers?: RawAxiosRequestHeaders,
        ) => {
            return axios.post<ResponseType>(endpoint, data, {
                ...axiosConfigPsb,
                headers: { ...axiosConfigPsb.headers, ...headers },
            });
        },
    },
};

export default api;
