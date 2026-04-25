import { AxiosError, AxiosInstance, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { v4 } from 'uuid';

const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;

export type CommonRequestHeader = Record<string, string> & {
    'X-Brukerdialog-Git-Sha': string;
};

export const commonRequestHeader: CommonRequestHeader = {
    'Content-type': 'application/json; charset=utf-8',
    'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
};

/**
 * Generisk klient-interface som fungerer med både @hey-api/client-axios Client
 * og genererte klient-typer.
 */
export interface ApiClient {
    setConfig: (config: AxiosRequestConfig | any) => void;
    instance: AxiosInstance;
}

export const initApiClient = (
    client: ApiClient,
    frontendPath: string,
    loginURL: string,
    onUnauthorized?: () => void,
) => {
    // Normaliser frontendPath til å alltid starte med /
    const normalizedPath = frontendPath.startsWith('/') ? frontendPath : `/${frontendPath}`;

    const apiBaseUrl = (typeof window !== 'undefined' && window.location.origin) || '';

    /** Setter config for generert klient */
    client.setConfig({
        withCredentials: false,
        headers: commonRequestHeader,
        baseURL: `${apiBaseUrl}${normalizedPath}`,
    });

    /**
     * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
     */
    client.instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isUnauthorized(error)) {
                onUnauthorized?.();
                if (typeof window !== 'undefined' && window.location.href !== loginURL) {
                    window.location.assign(loginURL);
                }
            }
            return Promise.reject(error);
        },
    );

    /**
     * Legg på X-Correlation-ID til alle requests for å kunne spore en request gjennom systemet.
     */
    client.instance.interceptors.request.use(
        (config) => {
            config.headers['X-Correlation-ID'] = v4();
            return config;
        },
        (error) => Promise.reject(error),
    );

    /**
     * Går gjennom objekt og erstatter alle null med undefined
     * @param obj
     * @returns
     */
    const convertNullToUndefined = (obj: any): any => {
        if (obj === null) {
            return undefined;
        }
        if (Array.isArray(obj)) {
            return obj.map(convertNullToUndefined);
        }
        if (typeof obj === 'object' && obj !== null) {
            return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, convertNullToUndefined(value)]));
        }
        return obj;
    };

    /** Erstatter alle null verdier med undefined */
    client.instance.interceptors.response.use(
        (response) => {
            response.data = convertNullToUndefined(response.data);
            return response;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
};
