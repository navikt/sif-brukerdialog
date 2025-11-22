import { getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler';
import constate from 'constate';

const MAX_AWAIT_TIME = 500;

export enum SIFCommonPageKey {
    'velkommen' = 'velkommen',
    'kvittering' = 'kvittering',
    'feilside' = 'feilside',
    'intro' = 'intro',
    'ikkeTilgang' = 'ikkeTilgang',
    'ikkeTilgjengelig' = 'ikkeTilgjengelig',
}

export enum AnalyticsEvents {
    'applikasjonStartet' = 'applikasjon-startet',
    'søknadStartet' = 'skjema startet',
    'søknadSendt' = 'skjema fullført',
    'søknadFeilet' = 'skjemainnsending feilet',
    'applikasjonInfo' = 'applikasjon-info',
    'applikasjonHendelse' = 'applikasjon-hendelse',
    'apiError' = 'api-error',
}

export enum SIFCommonGeneralEvents {
    'vedleggSlettet' = 'vedleggSlettet',
    'vedleggLastetOpp' = 'vedleggLastetOpp',
}

export enum ApplikasjonHendelse {
    'brukerSendesTilLoggInn' = 'brukerSendesTilLoggInn',
    'vedleggOpplastingFeilet' = 'vedleggOpplastingFeilet',
    'starterMedMellomlagring' = 'starterMedMellomlagring',
    'ugyldigMellomlagring' = 'ugyldigMellomlagring',
    'avbryt' = 'avbryt',
    'fortsettSenere' = 'fortsettSenere',
    'innloggetBrukerErEndret' = 'innloggetBrukerErEndret',
}

export enum ApiError {
    'oppstartsinfo' = 'oppstartsinfo',
    'søkerinfo' = 'søkerinfo',
    'arbeidsgiver' = 'arbeidsgiver',
    'barn' = 'barn',
    'vedlegg' = 'vedlegg',
    'mellomlagring' = 'mellomlagring',
}

interface Props {
    applicationKey: string;
    apiKey: string;
    isActive?: boolean;
    children: React.ReactNode;
    maxAwaitTime?: number;
}

type EventProperties = {
    [key: string]: any;
};

export const [AnalyticsProvider, useAnalyticsInstance] = constate((props: Props) => {
    const { applicationKey, isActive = true, maxAwaitTime = MAX_AWAIT_TIME, apiKey } = props;

    async function logEvent(eventName: SIFCommonGeneralEvents | string, eventProperties?: EventProperties) {
        const logger = getAnalyticsInstance('dekoratoren');
        if (isActive && logger) {
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), maxAwaitTime));
            const logPromise = new Promise((resolve) => {
                const eventProps = { ...eventProperties, app: applicationKey, applikasjon: applicationKey, apiKey };
                logger(eventName, eventProps).catch(() => {
                    resolve(true);
                });
            });
            return Promise.race([timeoutPromise, logPromise]);
        }
        return Promise.resolve();
    }

    async function logSoknadStartet(skjemanavn: string) {
        return logEvent(AnalyticsEvents.søknadStartet, {
            skjemanavn,
            skjemaId: applicationKey,
        });
    }

    async function logSoknadSent(skjemanavn: string, locale?: string) {
        return logEvent(AnalyticsEvents.søknadSendt, {
            skjemanavn,
            skjemaId: applicationKey,
            locale,
        });
    }

    async function logSoknadFailed(skjemanavn: string) {
        return logEvent(AnalyticsEvents.søknadFeilet, {
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

    async function logUserLoggedOut(info: string) {
        return logEvent(AnalyticsEvents.applikasjonHendelse, {
            hendelse: ApplikasjonHendelse.brukerSendesTilLoggInn,
            info,
        });
    }

    return {
        logEvent,
        logSoknadStartet,
        logSoknadSent,
        logSoknadFailed,
        logHendelse,
        logInfo,
        logApiError,
        logUserLoggedOut,
    };
});
