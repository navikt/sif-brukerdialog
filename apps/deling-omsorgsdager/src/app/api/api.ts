import { isForbidden, isUnauthorized } from '@navikt/sif-common-core/lib/utils/apiUtils';
import { getEnvironmentVariable } from '@navikt/sif-common-core/lib/utils/envUtils';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiEndpoint } from '../types/ApiEndpoint';

const axiosConfig = {
    withCredentials: true,
};

export const axiosJsonConfig = { ...axiosConfig, headers: { 'Content-type': 'application/json; charset=utf-8' } };
export const axiosMultipartConfig = { ...axiosConfig, headers: { 'Content-Type': 'multipart/form-data' } };

const sendMultipartPostRequest = (url: string, formData: FormData) => {
    return axios.post(url, formData, axiosMultipartConfig);
};

axios.defaults.baseURL = getEnvironmentVariable('API_URL');
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (isForbidden(error) || isUnauthorized(error)) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

const api = {
    get: <ResponseType>(endpoint: ApiEndpoint, paramString?: string, config?: AxiosRequestConfig) => {
        const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
        return axios.get<ResponseType>(url, config || axiosJsonConfig);
    },
    post: <DataType = any, ResponseType = any>(endpoint: ApiEndpoint, data: DataType) => {
        return axios.post<ResponseType>(endpoint, data, axiosJsonConfig);
    },
    uploadFile: (endpoint: ApiEndpoint, file: File) => {
        const formData = new FormData();
        formData.append('vedlegg', file);
        return sendMultipartPostRequest(endpoint, formData);
    },
    deleteFile: (url: string) => axios.delete(url, axiosJsonConfig),
};

export default api;
