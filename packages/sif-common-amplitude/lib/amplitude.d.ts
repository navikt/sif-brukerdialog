/// <reference types="react" />
export declare enum SIFCommonPageKey {
    'velkommen' = "velkommen",
    'kvittering' = "kvittering",
    'feilside' = "feilside",
    'intro' = "intro",
    'ikkeMyndig' = "ikkeMyndig",
    'ikkeTilgang' = "ikkeTilgang",
    'ikkeTilgjengelig' = "ikkeTilgjengelig"
}
export declare enum AmplitudeEvents {
    'sidevisning' = "sidevisning",
    'applikasjonStartet' = "applikasjon-startet",
    'søknadStartet' = "skjema startet",
    'søknadSendt' = "skjema fullf\u00F8rt",
    'søknadFeilet' = "skjemainnsending feilet",
    'applikasjonInfo' = "applikasjon-info",
    'applikasjonHendelse' = "applikasjon-hendelse",
    'apiError' = "api-error"
}
export declare enum ApplikasjonHendelse {
    'brukerSendesTilLoggInn' = "brukerSendesTilLoggInn",
    'vedleggOpplastingFeilet' = "vedleggOpplastingFeilet",
    'starterMedMellomlagring' = "starterMedMellomlagring",
    'ugyldigMellomlagring' = "ugyldigMellomlagring",
    'avbryt' = "avbryt",
    'fortsettSenere' = "fortsettSenere"
}
export declare enum ApiError {
    'oppstartsinfo' = "oppstartsinfo",
    'søkerinfo' = "s\u00F8kerinfo",
    'arbeidsgiver' = "arbeidsgiver",
    'barn' = "barn",
    'vedlegg' = "vedlegg",
    'mellomlagring' = "mellomlagring"
}
interface Props {
    applicationKey: string;
    logToConsoleOnly?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
    maxAwaitTime?: number;
}
declare type EventProperties = {
    [key: string]: any;
};
export declare const AmplitudeProvider: import("react").FC<import("react").PropsWithChildren<Props>>, useAmplitudeInstance: () => {
    logEvent: (eventName: string, eventProperties?: EventProperties) => Promise<unknown>;
    logSidevisning: (pageKey: string) => Promise<unknown>;
    setUserProperties: (properties: any) => void;
    logSoknadStartet: (skjemanavn: string) => Promise<unknown>;
    logSoknadSent: (skjemanavn: string) => Promise<unknown>;
    logSoknadFailed: (skjemanavn: string) => Promise<unknown>;
    logHendelse: (hendelse: ApplikasjonHendelse, details?: EventProperties) => Promise<unknown>;
    logInfo: (details: EventProperties) => Promise<unknown>;
    logApiError: (error: ApiError, details?: EventProperties) => Promise<unknown>;
    logUserLoggedOut: (info: string) => Promise<unknown>;
};
export {};
//# sourceMappingURL=amplitude.d.ts.map