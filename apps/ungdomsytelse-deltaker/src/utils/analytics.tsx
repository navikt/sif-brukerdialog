import { getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler';
import constate from 'constate';
import { Helmet } from 'react-helmet';

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
    'søkerinfo' = 'søkerinfo',
    'deltakelsePeriode' = 'deltakelsePeriode',
    'barn' = 'barn',
    'kontonummer' = 'kontonummer',
}

interface Props {
    applicationKey: string;
    logToConsoleOnly?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
    maxAwaitTime?: number;
}

type EventProperties = {
    [key: string]: any;
};

export const registerAnalytics = () => {
    return (
        <Helmet>
            <script
                defer
                src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                data-host-url="https://umami.nav.no"
                data-auto-track="false"
                data-website-id="d2348a9e-b7dc-42a1-ad51-02a6e2eadc5c"></script>
            <script
                defer
                src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                data-host-url="https://umami.nav.no"
                data-domains="localhost"
                data-auto-track="false"
                data-website-id="d2348a9e-b7dc-42a1-ad51-02a6e2eadc5c"></script>
        </Helmet>
    );
};

export const [AnalyticsProvider, useAnalyticsInstance] = constate((props: Props) => {
    const { applicationKey, isActive = true, maxAwaitTime = MAX_AWAIT_TIME, logToConsoleOnly } = props;

    if (isActive) {
        registerAnalytics();
    }

    async function logEvent(eventName: string, eventProperties?: EventProperties) {
        const logger = getAnalyticsInstance('dekoratoren');
        if (isActive && logger) {
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), maxAwaitTime));
            const logPromise = new Promise((resolve) => {
                const eventProps = { ...eventProperties, applikasjon: applicationKey };
                if (logToConsoleOnly) {
                    // eslint-disable-next-line no-console
                    console.log({ eventName, eventProperties: eventProps });
                    resolve(true);
                } else {
                    logger(eventName, eventProps).catch(() => {
                        resolve(true);
                    });
                }
            });
            return Promise.race([timeoutPromise, logPromise]);
        }
        return Promise.resolve();
    }

    async function logSoknadStartet(skjemanavn: string) {
        return logEvent(AnalyticsEvents.skjemaStartet, {
            skjemanavn,
            skjemaId: applicationKey,
        });
    }

    async function logSoknadSent(skjemanavn: string, locale?: string) {
        return logEvent(AnalyticsEvents.skjemaSendt, {
            skjemanavn,
            skjemaId: applicationKey,
            locale,
        });
    }

    async function logSoknadFailed(skjemanavn: string) {
        return logEvent(AnalyticsEvents.skjemaFeilet, {
            skjemanavn,
            skjemaId: applicationKey,
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
        return logEvent(AnalyticsEvents.applikasjonInfo, details);
    }

    return {
        logEvent,
        logSoknadStartet,
        logSoknadSent,
        logSoknadFailed,
        logHendelse,
        logInfo,
        logApiError,
    };
});
