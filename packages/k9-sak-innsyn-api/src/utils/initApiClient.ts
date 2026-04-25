import { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { v4 } from 'uuid';

const convertNullToUndefined = (obj: any): any => {
    if (obj === null) return undefined;
    if (Array.isArray(obj)) return obj.map(convertNullToUndefined);
    if (typeof obj === 'object')
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, convertNullToUndefined(v)]));
    return obj;
};

const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;

const commonRequestHeader = {
    'Content-type': 'application/json; charset=utf-8',
    'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
} as any;

/**
 * Generic client interface that works with both @hey-api/client-axios Client
 * and generated client types.
 */
interface ApiClient {
    setConfig: (config: any) => any;
    instance: AxiosInstance;
}

/**
 * Client er en instans av @navikt/k9-brukerdialog-prosessering-api/src/client/client, men
 * brukes her som en generell type for de andre genererte klientene.
 *
 */
export const initApiClient = (
    client: ApiClient,
    frontendPath: string,
    loginURL: string,
    onUnAuthorized?: () => void,
) => {
    /** Set config for generert klient */
    client.setConfig({
        withCredentials: false,
        headers: commonRequestHeader,
        baseURL: frontendPath,
    });

    /**
     * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
     */
    client.instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isUnauthorized(error)) {
                onUnAuthorized?.();
                window.location.assign(loginURL);
            }
            return Promise.reject(error);
        },
    );

    /**
     * Legg på X-Correlation-ID til alle requests for å kunne spore en request gjennom systemet.
     */
    client.instance.interceptors.request.use(
        (config) => {
            config.headers.set('X-Correlation-ID', v4());
            return config;
        },
        (error) => Promise.reject(error),
    );

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
