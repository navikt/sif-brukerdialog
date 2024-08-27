import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { storageParser } from './storageParser';
import apiUtils from '../apiUtils';

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
            return axios.put(url, data, apiUtils.addCorrelationIdToAxionsConfig(requestConfig));
        },
        create: (data?: StorageFormat) => {
            return axios.post(url, data || {}, apiUtils.addCorrelationIdToAxionsConfig(requestConfig));
        },
        /** deprecated */
        persist: (data?: StorageFormat) => {
            return axios.post(url, data, apiUtils.addCorrelationIdToAxionsConfig(requestConfig));
        },
        rehydrate: () => {
            return axios.get(
                url,
                apiUtils.addCorrelationIdToAxionsConfig({ ...requestConfig, transformResponse: storageParser }),
            );
        },
        purge: () => {
            return axios.delete(url, apiUtils.addCorrelationIdToAxionsConfig({ ...requestConfig, data: {} }));
        },
    };
}

export default persistence;
