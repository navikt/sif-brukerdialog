import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import axios, { AxiosError, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { appEnv } from '../utils/appEnv';
import { relocateToLoginPage, relocateToNoAccessPage } from '../utils/navigationUtils';

export enum ApiEndpoint {
    'barn' = 'oppslag/barn',
    'soker' = 'oppslag/soker',
    'kursholder' = 'oppslag/kursholder',
    'arbeidsgiver' = 'oppslag/arbeidsgiver',
    'send_søknad' = 'opplaringspenger/innsending',
    'vedlegg' = 'vedlegg',
    'mellomlagring' = 'mellomlagring/OPPLARINGSPENGER',
}

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfig: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: appEnv.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
};

export const axiosMultipartConfig: AxiosRequestConfig = {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' },
};

export const handleAxiosError = (error: AxiosError) => {
    if (isUnauthorized(error)) {
        relocateToLoginPage();
    } else if (isForbidden(error)) {
        relocateToNoAccessPage();
    }
    return Promise.reject(error);
};

axios.interceptors.response.use((response) => {
    return response;
}, handleAxiosError);

const api = {
    get: <ResponseType>(endpoint: ApiEndpoint, paramString?: string, config?: AxiosRequestConfig) => {
        const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
        return axios.get<ResponseType>(url, config || axiosConfig);
    },
    post: <DataType = any, ResponseType = any>(
        endpoint: ApiEndpoint,
        data: DataType,
        headers?: RawAxiosRequestHeaders,
    ) => {
        return axios.post<ResponseType>(endpoint, data, {
            ...axiosConfig,
            headers: { ...axiosConfig.headers, ...headers },
        });
    },
    uploadFile: (endpoint: ApiEndpoint, file: File) => {
        const formData = new FormData();
        formData.append('vedlegg', file);
        return axios.post(endpoint, formData, axiosMultipartConfig);
    },
    deleteFile: (url: string) => axios.delete(url, axiosConfig),
};

export default api;
