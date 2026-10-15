import {
    type AxiosError,
    type AxiosInstance,
    HttpStatusCode,
    isAxiosError,
    type RawAxiosRequestHeaders,
} from 'axios';
import { v4 } from 'uuid';

export interface ApiClient {
    setConfig: (config: { baseURL: string; headers: RawAxiosRequestHeaders; withCredentials: boolean }) => void;
    instance: AxiosInstance;
}

export interface InitApiClientOptions {
    frontendPath: string;
    loginURL: string;
    onUnauthorized?: () => void;
    headers?: RawAxiosRequestHeaders;
    isUnauthorized?: (error: AxiosError) => boolean;
    redirectOnUnauthorized?: boolean;
}

export type CommonRequestHeaders = {
    'X-Brukerdialog-Git-Sha': string;
    [header: string]: string;
};

export const commonRequestHeaders: CommonRequestHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
};

const defaultRequestHeaders: CommonRequestHeaders = {
    'X-Brukerdialog-Git-Sha': commonRequestHeaders['X-Brukerdialog-Git-Sha'],
};

const isPlainObject = (value: object): boolean => {
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

export const normalizeResponseData = (value: unknown): unknown => {
    if (value === null) {
        return undefined;
    }

    if (Array.isArray(value)) {
        return value.map(normalizeResponseData);
    }

    if (typeof value === 'object' && isPlainObject(value)) {
        return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalizeResponseData(entry)]));
    }

    return value;
};

const isUnauthorizedResponse = (error: AxiosError): boolean => error.response?.status === HttpStatusCode.Unauthorized;

export const initApiClient = (
    client: ApiClient,
    {
        frontendPath,
        loginURL,
        onUnauthorized,
        headers,
        isUnauthorized = isUnauthorizedResponse,
        redirectOnUnauthorized = true,
    }: InitApiClientOptions,
): void => {
    const normalizedPath = frontendPath.startsWith('/') ? frontendPath : `/${frontendPath}`;
    const origin = typeof window === 'undefined' ? '' : window.location.origin;

    client.setConfig({
        baseURL: `${origin}${normalizedPath}`,
        headers: headers === undefined ? defaultRequestHeaders : { ...defaultRequestHeaders, ...headers },
        withCredentials: false,
    });

    client.instance.interceptors.request.use(
        (config) => {
            config.headers.set('X-Correlation-ID', v4());
            return config;
        },
        (error: unknown) => Promise.reject(error),
    );

    client.instance.interceptors.response.use(
        (response) => {
            response.data = normalizeResponseData(response.data);
            return response;
        },
        (error: unknown) => {
            if (isAxiosError(error) && isUnauthorized(error)) {
                onUnauthorized?.();
                if (redirectOnUnauthorized && typeof window !== 'undefined' && window.location.href !== loginURL) {
                    window.location.assign(loginURL);
                }
            }
            return Promise.reject(error);
        },
    );
};
