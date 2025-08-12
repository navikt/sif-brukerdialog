import { Helmet } from 'react-helmet';
import { getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler';
import constate from 'constate';

const MAX_AWAIT_TIME = 500;

export enum AnalyticsEvents {
    'skjemaStartet' = 'skjema startet',
    'skjemaSendt' = 'skjema fullført',
    'skjemaFeilet' = 'skjemainnsending feilet',
    'applikasjonInfo' = 'applikasjon-info',
    'applikasjonHendelse' = 'applikasjon-hendelse',
    'apiError' = 'api-error',
}

export enum ApplikasjonHendelse {
    'avbryt' = 'avbryt',
    'fortsettSenere' = 'fortsettSenere',
    'erIkkeDeltaker' = 'erIkkeDeltaker',
    'harFlereDeltakelser' = 'harFlereDeltakelser',
}

export enum ApiError {
    'oppstartsinfo' = 'oppstartsinfo',
    'barn' = 'barn',
    'kontonummer' = 'kontonummer',
}

interface Props {
    applicationKey: string;
    isActive?: boolean;
    children: React.ReactNode;
    maxAwaitTime?: number;
}

type EventProperties = {
    [key: string]: any;
};

export const registerAnalytics = (websiteId?: string) => {
    if (!websiteId) {
        return;
    }
    return (
        <Helmet>
            <script
                defer
                src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                data-host-url="https://umami.nav.no"
                data-auto-track="true"
                data-website-id={websiteId}></script>
        </Helmet>
    );
};

export const [AnalyticsProvider, useAnalyticsInstance] = constate((props: Props) => {
    const { applicationKey, isActive = true, maxAwaitTime = MAX_AWAIT_TIME } = props;

    async function logEvent(eventName: string, eventProperties?: EventProperties) {
        const logger = getAnalyticsInstance('dekoratoren');
        if (isActive && logger) {
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), maxAwaitTime));
            const logPromise = new Promise((resolve) => {
                const eventProps = { ...eventProperties, applikasjon: applicationKey };
                logger(eventName, eventProps).catch(() => {
                    resolve(true);
                });
            });
            return Promise.race([timeoutPromise, logPromise]);
        }
        return Promise.resolve();
    }

    async function logSkjemaStartet(skjemanavn: string) {
        return logEvent(AnalyticsEvents.skjemaStartet, {
            skjemanavn,
        });
    }

    async function logSkjemaFullført(skjemanavn: string, metadata?: EventProperties) {
        return logEvent(AnalyticsEvents.skjemaSendt, {
            skjemanavn,
            ...metadata,
        });
    }

    async function logSkjemaFeilet(skjemanavn: string) {
        return logEvent(AnalyticsEvents.skjemaFeilet, {
            skjemanavn,
        });
    }

    async function logHendelse(hendelse: ApplikasjonHendelse, details?: EventProperties) {
        return logEvent(AnalyticsEvents.applikasjonHendelse, {
            hendelse,
            details,
        });
    }

    async function logApiError(error: ApiError, details?: EventProperties) {
        return logEvent(AnalyticsEvents.apiError, {
            error,
            details,
        });
    }

    async function logInfo(details: EventProperties) {
        return logEvent(AnalyticsEvents.applikasjonInfo, { ...details });
    }

    return {
        logSkjemaStartet,
        logSkjemaFullført,
        logSkjemaFeilet,
        logHendelse,
        logInfo,
        logApiError,
    };
});
