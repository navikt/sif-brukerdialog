import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getEnvVariableOrDefault } from '../utils/envUtils';
import { relocateToLoginPage, relocateToNoAccessPage } from '../utils/navigationUtils';

export enum ApiEndpoint {
    'soker' = 'oppslag/soker',
    'barn' = 'oppslag/barn',
    'send_søknad' = 'omsorgspenger-utvidet-rett/innsending',
    'vedlegg' = 'vedlegg',
    'mellomlagring' = 'mellomlagring/OMSORGSPENGER_UTVIDET_RETT',
}

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: true,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfig: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: getEnvVariableOrDefault('FRONTEND_API_PATH', 'http://localhost:8080'),
};

export const axiosMultipartConfig: AxiosRequestConfig = {
    ...axiosConfig,
    headers: { 'Content-Type': 'multipart/form-data' },
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
    get: <ResponseType>(endpoint: ApiEndpoint, paramString?: string, config?: AxiosRequestConfig) => {
        const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
        return axios.get<ResponseType>(url, config || axiosConfig);
    },
    post: <DataType = any, ResponseType = any>(endpoint: ApiEndpoint, data: DataType) => {
        return axios.post<ResponseType>(endpoint, data, axiosConfig);
    },
    uploadFile: (endpoint: ApiEndpoint, file: File) => {
        const formData = new FormData();
        formData.append('vedlegg', file);
        return axios.post(endpoint, formData, axiosMultipartConfig);
    },
    deleteFile: (url: string) => axios.delete(url, axiosConfig),
};

export default api;
