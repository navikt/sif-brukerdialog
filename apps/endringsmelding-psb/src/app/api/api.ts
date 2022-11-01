import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { storageParser } from '@navikt/sif-common-core-ds/lib/utils/persistence/persistence';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getEnvVariableOrDefault } from '../utils/envUtils';
import { relocateToLoginPage, relocateToNoAccessPage } from '../utils/navigationUtils';
import { ApiEndpointInnsyn, ApiEndpointPsb } from './endpoints';

export * from './endpoints';

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: true,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfigPsb: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: getEnvVariableOrDefault('API_URL', 'http://localhost:8080'),
};

export const axiosConfigInnsyn = {
    ...axiosConfigCommon,
    transformResponse: storageParser,
    baseURL: getEnvVariableOrDefault('API_URL_INNSYN', 'http://localhost:8082'),
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
            return Promise.reject(error);
        }
        if (isForbidden(error)) {
            relocateToNoAccessPage();
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
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
        post: <DataType = any, ResponseType = any>(endpoint: ApiEndpointPsb, data: DataType) => {
            return axios.post<ResponseType>(endpoint, data, axiosConfigPsb);
        },
    },
};

export default api;
