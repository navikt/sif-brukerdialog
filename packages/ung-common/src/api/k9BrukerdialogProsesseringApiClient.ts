import { client } from '@navikt/k9-brukerdialog-prosessering-api';
import { getCommonEnv, getMaybeEnv } from '@navikt/sif-common-env';
import { v4 } from 'uuid';
import { commonRequestHeader, isUnauthorized } from './';

export const initK9BrukerdialogProsesseringApiClient = () => {
    /** Set config for generert klient */
    client.setConfig({
        withCredentials: false,
        headers: commonRequestHeader,
        baseURL: getMaybeEnv('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH'),
    });

    /**
     * Håndterer 401 (Unauthorized) feil ved å sende brukeren til innloggingssiden.
     */
    client.instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isUnauthorized(error)) {
                window.location.assign(getCommonEnv().SIF_PUBLIC_LOGIN_URL);
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
