import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { getEnvVariableOrDefault } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import axios, { AxiosError, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { relocateToLoginPage, relocateToNoAccessPage } from '../utils/navigationUtils';

export enum ApiEndpoint {
    'soker' = 'oppslag/soker',
    'barn' = 'oppslag/barn',
    'send_søknad' = 'omsorgspenger-utvidet-rett/innsending',
    'vedlegg' = 'vedlegg',
    'mellomlagring' = 'mellomlagring/OMSORGSPENGER_UTVIDET_RETT',
    'innvilget_vedtak' = 'omsorgsdager-kronisk-sykt-barn/har-gyldig-vedtak',
}

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfig = (apiPath?: ApiEndpoint): AxiosRequestConfig => {
    if (apiPath === ApiEndpoint.innvilget_vedtak) {
        return {
            ...axiosConfigCommon,
            baseURL: getEnvVariableOrDefault('K9_SAK_INNSYN_FRONTEND_PATH', 'http://localhost:8089'),
        };
    }
    return {
        ...axiosConfigCommon,
        baseURL: getEnvVariableOrDefault('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH', 'http://localhost:8089'),
    };
};

export const axiosMultipartConfig = (apiEndpoint: ApiEndpoint): AxiosRequestConfig => {
    return {
        ...axiosConfig(apiEndpoint),
        headers: { 'Content-Type': 'multipart/form-data' },
    };
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
        return axios.get<ResponseType>(url, config || axiosConfig(endpoint));
    },
    post: <DataType = any, ResponseType = any>(
        endpoint: ApiEndpoint,
        data: DataType,
        headers?: RawAxiosRequestHeaders,
    ) => {
        return axios.post<ResponseType>(endpoint, data, {
            ...axiosConfig(endpoint),
            headers: { ...axiosConfig(endpoint).headers, ...headers },
        });
    },
    uploadFile: (endpoint: ApiEndpoint, file: File) => {
        const formData = new FormData();
        formData.append('vedlegg', file);
        return axios.post(endpoint, formData, axiosMultipartConfig(endpoint));
    },
    deleteFile: (url: string) => axios.delete(url, axiosConfig()),
};

export default api;
