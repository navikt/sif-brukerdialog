import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { isUnauthorized, isForbidden } from '@navikt/sif-common-core/lib/utils/apiUtils';

export const defaultAxiosConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

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

export enum ApiEndpoint {
    'soker' = 'oppslag/soker?ytelse=omsorgspenger-midlertidig-alene',
    'mellomlagring' = 'mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE',
    'barn' = 'oppslag/barn?ytelse=omsorgspenger-midlertidig-alene',
    'sendSoknad' = 'omsorgspenger-midlertidig-alene/innsending',
}

const api = {
    get: <ResponseType>(endpoint: string, paramString?: string, config?: AxiosRequestConfig) => {
        const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
        return axios.get<ResponseType>(url, config || defaultAxiosConfig);
    },
    post: <DataType = any, ResponseType = any>(endpoint: string, data: DataType) =>
        axios.post<ResponseType>(endpoint, data, defaultAxiosConfig),
};

export default api;
