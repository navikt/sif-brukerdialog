/* eslint-disable @typescript-eslint/no-explicit-any */
import { init, type InitOptions } from '@nais/apm';

/**
 * Lag 1: strukturell vurdering av om feilen stammer fra vår egen kode.
 * Fanger nettleserutvidelser, injiserte in-app-skript og tredjepartsskript uten at
 * vi må kjenne den konkrete feilmeldingen på forhånd.
 *
 * Vurderingen er en positiv eierskapssjekk (allowlist), ikke en denylist over kjente
 * tredjeparter: en frame regnes som vår kun hvis den ligger under en URL vi faktisk eier.
 * Ukjente tredjeparter blir dermed fremmede by default.
 */
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

/**
 * Prod: bundles ligger på CDN under vårt eget navnerom, jf. vite `base`. Vi sjekker kun
 * namespace-segmentet (ikke app-segmentet) siden 'dusseldorf' er et navnerom dedikert til
 * dette teamet — ingen andre publiserer dit. Det unngår sprik mellom APM-appnøkkelen og
 * det faktiske CDN-mappenavnet (de har i praksis driftet fra hverandre for enkelte apper).
 */
const getOwnedCdnPrefix = ({ namespace }: AppOwnership): string => `${CDN_ORIGIN}/${namespace}/`;

const getCurrentOrigin = (): string | undefined => globalThis.location?.origin || undefined;

const isOwnScriptFrame = (frame: any, ownership: AppOwnership): boolean => {
    const filename: string = frame?.filename ?? '';
    if (!/^https?:\/\//.test(filename)) return false;

    const path = filename.split(/[?#]/)[0];

    if (path.startsWith(getOwnedCdnPrefix(ownership))) return true;

    // Dev og lokal kjøring serverer bundlene fra samme origin som dokumentet. Vi krever
    // fortsatt at framen peker på en kildefil, siden injiserte inline-skript rapporterer
    // dokument-URL-en som filnavn.
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
