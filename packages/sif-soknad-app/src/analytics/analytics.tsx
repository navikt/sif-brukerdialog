import { Events, getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

const MAX_AWAIT_TIME = 500;

export enum CustomAnalyticsEvents {
    'applikasjonInfo' = 'applikasjon-info',
    'applikasjonHendelse' = 'applikasjon-hendelse',
    'apiError' = 'api-error',
}

export enum ApplikasjonHendelse {
    'avbryt' = 'avbryt',
    'fortsettSenere' = 'fortsettSenere',
    'starterMedMellomlagring' = 'starterMedMellomlagring',
    'ugyldigMellomlagring' = 'ugyldigMellomlagring',
    'vedleggOpplastingFeilet' = 'vedleggOpplastingFeilet',
    'innloggetBrukerErEndret' = 'innloggetBrukerErEndret',
}

interface AnalyticsContextValue {
    logEvent: (event: (typeof Events)[keyof typeof Events], properties?: Record<string, unknown>) => Promise<void>;
    logCustom: (event: string, properties?: Record<string, unknown>) => Promise<void>;
    logSkjemaStartet: () => Promise<void>;
    logSkjemaFullført: () => Promise<void>;
    logSkjemaFeilet: () => Promise<void>;
    logHendelse: (hendelse: ApplikasjonHendelse, details?: Record<string, unknown>) => Promise<void>;
    logApiError: (error: string, details?: Record<string, unknown>) => Promise<void>;
}

const noOp = async () => {};

const noOpAnalytics: AnalyticsContextValue = {
    logEvent: noOp,
    logCustom: noOp,
    logSkjemaStartet: noOp,
    logSkjemaFullført: noOp,
    logSkjemaFeilet: noOp,
    logHendelse: noOp,
    logApiError: noOp,
};

const AnalyticsContext = createContext<AnalyticsContextValue>(noOpAnalytics);

interface AnalyticsProviderProps {
    applicationKey: string;
    isActive?: boolean;
}
export interface AnalyticsProviderConfig {
    isActive: boolean;
}

export const AnalyticsProvider = ({
    applicationKey,
    isActive = true,
    children,
}: PropsWithChildren<AnalyticsProviderProps>) => {
    const value = useMemo<AnalyticsContextValue>(() => {
        const logger = isActive ? getAnalyticsInstance(applicationKey) : null;

        async function logEvent(
            event: (typeof Events)[keyof typeof Events],
            properties?: Record<string, unknown>,
        ): Promise<void> {
            if (!logger) return;
            const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_AWAIT_TIME));
            const log = Promise.resolve(logger(event, properties))
                .then(() => undefined)
                .catch(() => undefined);
            return Promise.race([timeout, log]);
        }

        async function logCustom(event: string, properties?: Record<string, unknown>): Promise<void> {
            if (!logger) return;
            const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_AWAIT_TIME));
            const log = logger
                .custom(event, properties)
                .then(() => undefined)
                .catch(() => undefined);
            return Promise.race([timeout, log]);
        }

        return {
            logEvent,
            logCustom,
            logSkjemaStartet: () => logEvent(Events.SKJEMA_STARTET, { skjemaId: applicationKey }),
            logSkjemaFullført: () => logEvent(Events.SKJEMA_FULLFORT, { skjemaId: applicationKey }),
            logSkjemaFeilet: () => logEvent(Events.SKJEMA_INNSENDING_FEILET, { skjemaId: applicationKey }),
            logHendelse: (hendelse, details) =>
                logCustom(CustomAnalyticsEvents.applikasjonHendelse, { hendelse, details }),
            logApiError: (error, details) => logCustom(CustomAnalyticsEvents.apiError, { error, details }),
        };
    }, [applicationKey, isActive]);

    return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

/** Hook for å logge analytics-hendelser. Returnerer no-op-instans utenfor AnalyticsProvider. */
export const useAnalyticsInstance = (): AnalyticsContextValue => useContext(AnalyticsContext);
