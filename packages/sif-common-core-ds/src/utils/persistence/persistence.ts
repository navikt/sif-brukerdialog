import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { storageParser } from './storageParser';

dayjs.extend(customParseFormat);

export interface PersistenceInterface<StorageFormat, ResponseFormat = any> {
    update: (data: StorageFormat) => Promise<AxiosResponse<ResponseFormat>>;
    create: () => Promise<AxiosResponse<ResponseFormat>>;
    /**
     * @deprecated use create and update instead
     */
    persist?: (data?: StorageFormat) => Promise<AxiosResponse<ResponseFormat>>;
    rehydrate: () => Promise<AxiosResponse<StorageFormat>>;
    purge: () => Promise<AxiosResponse>;
}

export interface PersistenceConfig {
    requestConfig: AxiosRequestConfig;
    url: string;
}

function persistence<StorageFormat>({ requestConfig, url }: PersistenceConfig): PersistenceInterface<StorageFormat> {
    return {
        update: (data: StorageFormat) => {
            return axios.put(url, data, requestConfig);
        },
        create: (data?: StorageFormat) => {
            return axios.post(url, data || {}, requestConfig);
        },
        /** deprecated */
        persist: (data?: StorageFormat) => {
            return axios.post(url, data, requestConfig);
        },
        rehydrate: () => {
            return axios.get(url, { ...requestConfig, transformResponse: storageParser });
        },
        purge: () => {
            return axios.delete(url, { ...requestConfig, data: {} });
        },
    };
}

export default persistence;
