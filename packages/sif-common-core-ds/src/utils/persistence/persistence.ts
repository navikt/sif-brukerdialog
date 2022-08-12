import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateRegExp = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);

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

const isISODateString = (value: any): value is string => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

const isDateStringToBeParse = (value: string): boolean => {
    return dateRegExp.test(value);
};

export const dateStringToDateObjectMapper = (_key: string, value: string) => {
    if (isISODateString(value)) {
        return value;
    }
    if (!Array.isArray(value) && isDateStringToBeParse(value)) {
        return new Date(value);
    }
    return value;
};

export const storageParser = (storageResponse: string) => {
    if (storageResponse) {
        return JSON.parse(storageResponse, dateStringToDateObjectMapper);
    }
};

function persistence<StorageFormat>({ requestConfig, url }: PersistenceConfig): PersistenceInterface<StorageFormat> {
    return {
        update: (data: StorageFormat) => {
            return Axios.put(url, data, requestConfig);
        },
        create: (data?: StorageFormat) => {
            return Axios.post(url, data || {}, requestConfig);
        },
        /** deprecated */
        persist: (data?: StorageFormat) => {
            return Axios.post(url, data, requestConfig);
        },
        rehydrate: () => {
            return Axios.get(url, { ...requestConfig, transformResponse: storageParser });
        },
        purge: () => {
            return Axios.delete(url, { ...requestConfig, data: {} });
        },
    };
}

export default persistence;
