import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { ApiEndpoint } from '../types/ApiEndpoint';

const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
};

export const axiosJsonConfig = { ...axiosConfig, headers: { 'Content-type': 'application/json; charset=utf-8' } };
export const axiosMultipartConfig = { ...axiosConfig, headers: { 'Content-Type': 'multipart/form-data' } };

const sendMultipartPostRequest = (url: string, formData: FormData) => {
    return axios.post(url, formData, axiosMultipartConfig);
};

axios.defaults.baseURL = getEnvironmentVariable('FRONTEND_API_PATH');
axios.defaults.withCredentials = false;
axios.interceptors.request.use((config) => {
    return config;
});

const api = {
    get: <ResponseType>(endpoint: ApiEndpoint, paramString?: string, config?: AxiosRequestConfig) => {
        const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
        return axios.get<ResponseType>(url, config || axiosJsonConfig);
    },
    post: <DataType = any, ResponseType = any>(
        endpoint: ApiEndpoint,
        data: DataType,
        headers?: RawAxiosRequestHeaders,
    ) => {
        return axios.post<ResponseType>(endpoint, data, {
            ...axiosJsonConfig,
            headers: { ...axiosJsonConfig.headers, ...headers },
        });
    },
    uploadFile: (endpoint: ApiEndpoint, file: File) => {
        const formData = new FormData();
        formData.append('vedlegg', file);
        return sendMultipartPostRequest(endpoint, formData);
    },
    deleteFile: (url: string) => axios.delete(url, axiosJsonConfig),
};

export default api;
