import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiEndpointBrukerdialog, ApiEndpointInnsyn } from './endpoints';

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: true,
};

const axiosConfigPsb: AxiosRequestConfig = {
    ...axiosConfigCommon,
    // transformResponse: storageParser,
    baseURL: process.env.NEXT_PUBLIC_API_URL_BRUKERDIALOG,
};

const axiosConfigInnsyn: AxiosRequestConfig = {
    ...axiosConfigCommon,
    // transformResponse: storageParser,
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
        //     // Reload for redirecting to login page
        //     console.log('abc');
        //     window.location.reload();
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
    brukerdialog: {
        get: <ResponseType>(endpoint: ApiEndpointBrukerdialog, paramString?: string, config?: AxiosRequestConfig) => {
            const url = `${process.env.NEXT_PUBLIC_API_URL_BRUKERDIALOG}/${endpoint}${
                paramString ? `?${paramString}` : ''
            }`;

            return axios.get<ResponseType>(url, config || axiosConfigPsb);
        },
    },
};
