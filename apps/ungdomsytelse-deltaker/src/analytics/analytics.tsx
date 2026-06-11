import { Events, getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler';
import constate from 'constate';
import { DeltakerSkjemaId } from '../types/DeltakerSkjemaId';

const MAX_AWAIT_TIME = 500;

export { Events };

export enum CustomAnalyticsEvents {
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

export enum ApiErrorKey {
    'oppstartsinfo' = 'oppstartsinfo',
    'barn' = 'barn',
    'kontonummer' = 'kontonummer',
}

type EventProperties = {
    [key: string]: any;
};

interface Props {
    applicationKey: string;
    isActive?: boolean;
    children: React.ReactNode;
}

export const [AnalyticsProvider, useAnalyticsInstance] = constate((props: Props) => {
    const { applicationKey, isActive = true } = props;
    const logger = isActive ? getAnalyticsInstance(applicationKey) : null;

    async function logEvent(event: (typeof Events)[keyof typeof Events], properties?: Record<string, unknown>) {
        if (!logger) return;
        const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_AWAIT_TIME));
        const log = Promise.resolve(logger(event, properties))
            .then(() => undefined)
            .catch(() => undefined);
        return Promise.race([timeout, log]);
    }

    async function logCustom(event: string, properties?: Record<string, unknown>) {
        if (!logger) return;
        const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_AWAIT_TIME));
        const log = logger
            .custom(event, properties)
            .then(() => undefined)
            .catch(() => undefined);
        return Promise.race([timeout, log]);
    }

    async function logSkjemaStartet(skjemaId: DeltakerSkjemaId) {
        return logEvent(Events.SKJEMA_STARTET, { skjemaId });
    }
    async function logSkjemaFullført(skjemaId: DeltakerSkjemaId) {
        return logEvent(Events.SKJEMA_FULLFORT, { skjemaId });
    }

    async function logHendelse(hendelse: ApplikasjonHendelse, details?: EventProperties) {
        return logCustom(CustomAnalyticsEvents.applikasjonHendelse, { hendelse, details });
    }
    async function logSkjemaFeilet(skjemaId: DeltakerSkjemaId) {
        return logEvent(Events.SKJEMA_INNSENDING_FEILET, { skjemaId });
    }

    async function logApiError(error: ApiErrorKey, details?: EventProperties) {
        return logCustom(CustomAnalyticsEvents.apiError, { error, details });
    }

    return { logEvent, logCustom, logSkjemaStartet, logSkjemaFullført, logSkjemaFeilet, logHendelse, logApiError };
});
