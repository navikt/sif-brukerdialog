import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { getEnvVariableOrDefault } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { relocateToLoginPage, relocateToNoAccessPage } from '../utils/navigationUtils';

export enum ApiEndpoint {
    'soker' = 'oppslag/soker',
    'barn' = 'oppslag/barn',
    'send_søknad' = 'ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/innsending',
    'mellomlagring' = 'mellomlagring/EKSTRA_OMSORGSDAGER_ANDRE_FORELDER_IKKE_TILSYN',
}

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfig: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: getEnvVariableOrDefault('FRONTEND_API_PATH', 'http://localhost:8089'),
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
