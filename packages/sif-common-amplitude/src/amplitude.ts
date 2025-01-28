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

export enum AmplitudeEvents {
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
    logToConsoleOnly?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
    maxAwaitTime?: number;
}

type EventProperties = {
    [key: string]: any;
};

export const [AmplitudeProvider, useAmplitudeInstance] = constate((props: Props) => {
    const { applicationKey, isActive = true, maxAwaitTime = MAX_AWAIT_TIME, logToConsoleOnly, apiKey } = props;

    async function logEvent(eventName: SIFCommonGeneralEvents | string, eventProperties?: EventProperties) {
        const amplitude = (window as any)?.dekoratorenAmplitude;
        if (isActive && amplitude) {
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), maxAwaitTime));
            const logPromise = new Promise((resolve) => {
                const eventProps = { ...eventProperties, app: applicationKey, applikasjon: applicationKey, apiKey };
                if (logToConsoleOnly) {
                    // eslint-disable-next-line no-console
                    console.log({ eventName, eventProperties: eventProps });
                    resolve(true);
                } else {
                    amplitude.track(eventName, eventProps);
                    amplitude.flush().promise.then((result) => resolve(result));
                }
            });
            return Promise.race([timeoutPromise, logPromise]);
        }
        return Promise.resolve();
    }

    async function logSoknadStartet(skjemanavn: string) {
        return logEvent(AmplitudeEvents.søknadStartet, {
            skjemanavn,
            skjemaId: applicationKey,
        });
    }

    async function logSoknadSent(skjemanavn: string, locale?: string) {
        return logEvent(AmplitudeEvents.søknadSendt, {
            skjemanavn,
            skjemaId: applicationKey,
            locale,
        });
    }

    async function logSoknadFailed(skjemanavn: string) {
        return logEvent(AmplitudeEvents.søknadFeilet, {
            skjemanavn,
            skjemaId: applicationKey,
        });
    }

    async function logHendelse(hendelse: ApplikasjonHendelse, details?: EventProperties) {
        return logEvent(AmplitudeEvents.applikasjonHendelse, {
            hendelse,
            details,
        });
    }

    async function logApiError(error: ApiError, details?: EventProperties) {
        return logEvent(AmplitudeEvents.apiError, {
            error,
            details,
        });
    }

    async function logInfo(details: EventProperties) {
        return logEvent(AmplitudeEvents.applikasjonInfo, details);
    }

    async function logUserLoggedOut(info: string) {
        return logEvent(AmplitudeEvents.applikasjonHendelse, {
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
