/* eslint-disable @typescript-eslint/no-explicit-any */
import { init, type InitOptions } from '@nais/apm';

/** Lag 1: positiv eierskapssjekk (allowlist) på om feilen stammer fra vår egen kode. */
export interface AppOwnership {
    /** NAIS-namespace, tilsvarer <namespace> i CDN-stien. Normalt 'dusseldorf'. */
    namespace: string;
}

const CDN_ORIGIN = 'https://cdn.nav.no';

const SCRIPT_FILE_PATTERN = /\.(js|mjs|cjs|jsx|ts|tsx)$/;

/** Settes av initApm. Uten den kan vi ikke avgjøre eierskap, og lag 1 slår seg av. */
let currentAppOwnership: AppOwnership | undefined;

/** For apper som initialiserer Faro selv og derfor ikke går via initApm. */
export const setAppOwnership = (ownership: AppOwnership): void => {
    currentAppOwnership = ownership;
};

/** Kun namespace-segmentet, ikke app-segmentet: 'dusseldorf' er dedikert til dette teamet. */
const getOwnedCdnPrefix = ({ namespace }: AppOwnership): string => `${CDN_ORIGIN}/${namespace}/`;

const getCurrentOrigin = (): string | undefined => globalThis.location?.origin || undefined;

const isOwnScriptFrame = (frame: any, ownership: AppOwnership): boolean => {
    const filename: string = frame?.filename ?? '';
    if (!/^https?:\/\//.test(filename)) return false;

    const path = filename.split(/[?#]/)[0];

    if (path.startsWith(getOwnedCdnPrefix(ownership))) return true;

    // Dev/lokal: bundlene serveres fra samme origin som dokumentet, men vi krever
    // fortsatt en kildefil-etterlikning for å ikke matche injiserte inline-skript.
    const origin = getCurrentOrigin();
    if (origin && path.startsWith(`${origin}/`)) return SCRIPT_FILE_PATTERN.test(path);

    return false;
};

export const isForeignCodeException = (item: any, ownership = currentAppOwnership): boolean => {
    if (item?.type !== 'exception') return false;
    // Fail-open: uten kjent eierskap er det bedre å beholde støy enn å miste ekte feil.
    if (!ownership) return false;
    const frames: any[] = item.payload?.stacktrace?.frames ?? [];
    if (frames.length === 0) return false;
    return !frames.some((frame) => isOwnScriptFrame(frame, ownership));
};

/**
 * Lag 2: kjente støymønstre som lag 1 ikke kan fange, fordi feilen mangler stacktrace
 * eller faktisk oppstår i vår egen bundle. Hold denne listen kort.
 */
const KNOWN_NOISY_EXCEPTION_PATTERNS: RegExp[] = [
    /Non-Error promise rejection captured with value: Request (timeout|aborted)/,
    /^AxiosError: Network Error$/,
    /^Error: Script error\.$/,
];

/**
 * Fanger Nav Dekoratørens console.error-format for bakgrunnskall som feiler på nettverksnivå.
 * Meldingsteksten settes av nettlesermotoren (Failed to fetch, Load failed, NetworkError ...),
 * derfor matcher vi feilklassen framfor den enkelte formuleringen.
 */
const DECORATOR_NOISY_EXCEPTION_PATTERNS: RegExp[] = [
    /^(?:Error: )?console\.error: \[ERROR\] .*"error":"(?:TypeError|AbortError)[^"]*"\}$/,
];

const getExceptionText = (item: any): string => {
    const { type, value, message } = item.payload ?? {};
    return [type && value ? `${type}: ${value}` : type || value, message].filter(Boolean).join(' ').trim();
};

export const isKnownNoisyException = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    const text = getExceptionText(item);
    const patterns = [...KNOWN_NOISY_EXCEPTION_PATTERNS, ...DECORATOR_NOISY_EXCEPTION_PATTERNS];
    return patterns.some((pattern) => pattern.test(text));
};

/** Samlet vurdering av begge lagene. Brukes av apper som initialiserer Faro selv. */
export const isNoiseException = (item: any, ownership = currentAppOwnership): boolean =>
    isForeignCodeException(item, ownership) || isKnownNoisyException(item);

export const initApm = ({ beforeSend: callerBeforeSend, ...options }: InitOptions): void => {
    // Uten namespace kan vi ikke utlede CDN-prefikset vi eier, og lag 1 forblir avslått.
    if (options.namespace) {
        setAppOwnership({ namespace: options.namespace });
    }
    init({
        ...options,
        beforeSend: (item: any) => {
            if (isNoiseException(item)) return null;
            return callerBeforeSend ? callerBeforeSend(item) : item;
        },
    });
};
