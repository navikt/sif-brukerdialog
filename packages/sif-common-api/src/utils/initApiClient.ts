import { AxiosError, AxiosInstance, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { v4 } from 'uuid';

const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;

const commonRequestHeader: Record<string, string> = {
    'Content-type': 'application/json; charset=utf-8',
    'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
};

/**
 * Generisk klient-interface som fungerer med både @hey-api/client-axios Client
 * og genererte klient-typer.
 */
interface ApiClient {
    setConfig: (config: AxiosRequestConfig | any) => void;
    instance: AxiosInstance;
}

export type InitApiClientOptions = {
    loginURL?: string;
    onUnauthorized?: () => void;
    headers?: Record<string, string>;
};

export const initApiClient = (client: ApiClient, frontendPath: string, options?: InitApiClientOptions) => {
    // Konfigurasjonsvalidering
    if (!frontendPath.startsWith('/')) {
        // eslint-disable-next-line no-console
        console.warn('frontendPath bør starte med /', frontendPath);
    }

    const apiBaseUrl = (typeof window !== 'undefined' && window.location.origin) || '';
    /** Setter config for generert klient */
    client.setConfig({
        withCredentials: false,
        headers: { ...commonRequestHeader, ...options?.headers },
        baseURL: `${apiBaseUrl}${frontendPath}`,
    });

    /**
     * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
     */
    client.instance.interceptors.response.use(
        (response) => response,
        (error) => {
            const is401 = isUnauthorized(error);

            if (options && is401) {
                if (options.onUnauthorized) {
                    options.onUnauthorized();
                }
                if (options.loginURL) {
                    if (typeof window !== 'undefined' && window.location.href !== options.loginURL) {
                        window.location.assign(options.loginURL);
                    }
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
            config.headers.set('X-Correlation-ID', v4());
            return config;
        },
        (error) => Promise.reject(error),
    );

    /**
     * Går gjennom objekt og sletter alle nøkler med null-verdier
     * @param obj
     * @param visited - WeakSet for å håndtere cirkulære referanser
     * @returns
     */
    const deleteNullValues = (obj: any, visited = new WeakSet()): any => {
        if (obj === null) {
            return undefined;
        }

        // Håndter primitive typer og Date objekter
        if (obj instanceof Date || typeof obj !== 'object') {
            return obj;
        }

        // Guard mot cirkulære referanser
        if (visited.has(obj)) {
            return obj;
        }
        visited.add(obj);

        if (Array.isArray(obj)) {
            return obj.map((item) => deleteNullValues(item, visited));
        }

        // Vanlige objekter
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([, value]) => value !== null)
                .map(([key, value]) => [key, deleteNullValues(value, visited)]),
        );
    };

    /** Erstatter alle null verdier med undefined */
    client.instance.interceptors.response.use(
        (response) => {
            response.data = deleteNullValues(response.data);
            return response;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
};
