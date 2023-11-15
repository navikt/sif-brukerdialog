import { storageParser } from '@navikt/sif-common-core-ds/lib/utils/persistence/storageParser';
import axios, { AxiosError, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { ApiEndpointInnsyn, ApiEndpointPsb } from './endpoints';

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: true,
};

const axiosConfigPsb: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
};

const axiosConfigInnsyn: AxiosRequestConfig = {
    ...axiosConfigCommon,
    transformResponse: storageParser,
    baseURL: process.env.NEXT_PUBLIC_API_URL_INNSYN,
};

axios.interceptors.request.use((config) => {
    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        // if (isUnauthorized(error)) {
        //     relocateToLoginPage();
        //     return Promise.reject({
        //         status: RequestStatus.redirectingToLogin,
        //     });
        // }
        return Promise.reject(error);
    },
);

export const api = {
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
