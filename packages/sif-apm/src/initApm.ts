/* eslint-disable @typescript-eslint/no-explicit-any */
import { init, type InitOptions } from '@nais/apm';

/**
 * Lag 1: strukturell vurdering av om feilen stammer fra vår egen kode.
 * Fanger nettleserutvidelser, injiserte in-app-skript og tredjepartsskript uten at
 * vi må kjenne den konkrete feilmeldingen på forhånd.
 */

// Skript vi laster inn, men ikke eier. Ligger delvis på samme CDN som våre egne bundles.
const THIRD_PARTY_SCRIPT_PATTERNS: RegExp[] = [
    /personbruker\/nav-dekoratoren/,
    /team-researchops\/sporing/,
    /uxsignals/,
    /skyra/,
    /boost\.ai/,
    /puzzel/,
];

const isOwnScriptFrame = (frame: any): boolean => {
    const filename: string = frame?.filename ?? '';
    if (!/^https?:\/\//.test(filename)) return false;

    // Injiserte inline-skript rapporterer dokument-URL-en som filnavn. Egen kode peker alltid på en
    // kildefil, enten minifisert (.js) eller sourcemap-oppløst (.ts/.tsx).
    const path = filename.split(/[?#]/)[0];
    if (!/\.(js|mjs|cjs|jsx|ts|tsx)$/.test(path)) return false;

    return !THIRD_PARTY_SCRIPT_PATTERNS.some((pattern) => pattern.test(path));
};

export const isForeignCodeException = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    const frames: any[] = item.payload?.stacktrace?.frames ?? [];
    if (frames.length === 0) return false;
    return !frames.some(isOwnScriptFrame);
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

const getExceptionText = (item: any): string => {
    const { type, value, message } = item.payload ?? {};
    return [type && value ? `${type}: ${value}` : type || value, message].filter(Boolean).join(' ').trim();
};

export const isKnownNoisyException = (item: any): boolean => {
    if (item?.type !== 'exception') return false;
    const text = getExceptionText(item);
    return KNOWN_NOISY_EXCEPTION_PATTERNS.some((pattern) => pattern.test(text));
};

/** Samlet vurdering av begge lagene. Brukes av apper som initialiserer Faro selv. */
export const isNoiseException = (item: any): boolean => isForeignCodeException(item) || isKnownNoisyException(item);

export const initApm = ({ beforeSend: callerBeforeSend, ...options }: InitOptions): void => {
    init({
        ...options,
        beforeSend: (item: any) => {
            if (isNoiseException(item)) return null;
            return callerBeforeSend ? callerBeforeSend(item) : item;
        },
    });
};
