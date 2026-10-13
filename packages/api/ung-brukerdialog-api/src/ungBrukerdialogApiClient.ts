import { AxiosError, HttpStatusCode } from 'axios';
import { v4 } from 'uuid';

const convertNullToUndefined = (obj: any): any => {
    if (obj === null) return undefined;
    if (Array.isArray(obj)) return obj.map(convertNullToUndefined);
    if (typeof obj === 'object')
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, convertNullToUndefined(v)]));
    return obj;
};

import { client } from './ung-brukerdialog-api';

const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;

const commonRequestHeader = {
    'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
} as any;

interface InitOptions {
    frontendPath: string;
    loginURL: string;
    onUnauthorized?: () => void;
}

export const initUngBrukerdialogApiClient = (options: InitOptions) => {
    const normalizedPath = options.frontendPath.startsWith('/') ? options.frontendPath : `/${options.frontendPath}`;
    const apiBaseUrl = (typeof window !== 'undefined' && window.location.origin) || '';

    client.setConfig({
        withCredentials: false,
        headers: commonRequestHeader,
        baseURL: `${apiBaseUrl}${normalizedPath}`,
    });

    client.instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isUnauthorized(error)) {
                options.onUnauthorized?.();
                window.location.assign(options.loginURL);
            }
            return Promise.reject(error);
        },
    );

    client.instance.interceptors.request.use(
        (config) => {
            config.headers.set('X-Correlation-ID', v4());
            return config;
        },
        (error) => Promise.reject(error),
    );

    client.instance.interceptors.response.use(
        (response) => {
            response.data = convertNullToUndefined(response.data);
            return response;
        },
        (error) => Promise.reject(error),
    );
};
