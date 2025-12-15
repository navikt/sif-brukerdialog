/**
 * Validerer og saniterer path-segmenter for å beskytte mot SSRF (Server-Side Request Forgery).
 * Brukes for å sikre at brukerinput ikke kan manipulere URL-er til å peke på uønskede ressurser.
 */

/**
 * Regex for gyldig path-segment.
 * Tillater alfanumeriske tegn, bindestrek og understrek.
 * Saksnummer i k9-sak er typisk UUID eller numerisk.
 */
const VALID_PATH_SEGMENT_REGEX = /^[a-zA-Z0-9_-]+$/;

/**
 * Regex for gyldig dokumentTittel.
 * Tillater vanlige tegn brukt i dokumentnavn inkludert norske bokstaver, mellomrom og punktum.
 */
const VALID_DOCUMENT_TITLE_REGEX = /^[a-zA-ZæøåÆØÅ0-9_.\s-]+$/;

/**
 * Regex for gyldig relativ API-path (inkluderer URL-encodede tegn og query-string).
 */
const VALID_RELATIVE_API_PATH_REGEX = /^[a-zA-Z0-9_%\-./?=&]+$/;

/** Regex for organisasjonsnummer (9-11 sifre). */
const VALID_ORGNUMMER_REGEX = /^[0-9]{9,11}$/;

/**
 * Validerer at et path-segment er trygt å bruke i en URL.
 * Kaster feil hvis segmentet er ugyldig.
 *
 * @param segment - Path-segmentet som skal valideres
 * @throws Error hvis segmentet er ugyldig
 */
export function validatePathSegment(segment: string, paramName: string = 'path segment'): void {
    if (!segment || typeof segment !== 'string') {
        throw new Error(`${paramName} er påkrevd og må være en streng`);
    }

    // Regex tillater kun alfanumeriske tegn, bindestrek og understrek.
    // Dette blokkerer automatisk path traversal (..), URL-schemes (:), og andre ugyldige tegn.
    if (!VALID_PATH_SEGMENT_REGEX.test(segment)) {
        throw new Error(`${paramName} inneholder ugyldige tegn`);
    }
}

/**
 * Validerer et saksnummer.
 * Saksnummer er typisk UUID eller numerisk ID.
 *
 * @param saksnummer - Saksnummeret som skal valideres
 * @throws Error hvis saksnummeret er ugyldig
 */
export function validateSaksnummer(saksnummer: string): void {
    validatePathSegment(saksnummer, 'Saksnummer');
}

export const saksnummerPathValueIsValid = (value: unknown): value is string => {
    if (typeof value !== 'string' || value.length === 0) {
        return false;
    }
    try {
        validateSaksnummer(value);
        return true;
    } catch {
        return false;
    }
};

/**
 * Validerer en dokumenttittel.
 * Tillater litt mer enn path-segmenter (mellomrom, punktum).
 *
 * @param dokumentTittel - Dokumenttittelen som skal valideres
 * @throws Error hvis tittelen er ugyldig
 */
export function validateDokumentTittel(dokumentTittel: string): void {
    if (!dokumentTittel || typeof dokumentTittel !== 'string') {
        throw new Error('Dokumenttittel er påkrevd og må være en streng');
    }

    // Regex tillater kun norske/engelske bokstaver, tall, understrek, bindestrek, punktum og mellomrom.
    // Dette blokkerer automatisk path traversal, URL-schemes og andre ugyldige tegn.
    if (!VALID_DOCUMENT_TITLE_REGEX.test(dokumentTittel)) {
        throw new Error('Dokumenttittel inneholder ugyldige tegn');
    }
}

/** Validerer at en relativ API-path ikke kan brukes til SSRF. */
export function validateRelativeApiPath(path: string, paramName: string = 'path'): string {
    if (!path || typeof path !== 'string') {
        throw new Error(`${paramName} er påkrevd og må være en streng`);
    }

    if (path.includes('://') || path.startsWith('//')) {
        throw new Error(`${paramName} inneholder ugyldige tegn`);
    }

    if (path.includes('..')) {
        throw new Error(`${paramName} inneholder ugyldige tegn`);
    }

    if (!VALID_RELATIVE_API_PATH_REGEX.test(path)) {
        throw new Error(`${paramName} inneholder ugyldige tegn`);
    }

    return path;
}

/** Validerer organisasjonsnummer (9 sifre). */
export function validateOrganisasjonsnummer(organisasjonsnummer: string): void {
    if (!organisasjonsnummer || typeof organisasjonsnummer !== 'string') {
        throw new Error('Organisasjonsnummer er påkrevd og må være en streng');
    }

    if (!VALID_ORGNUMMER_REGEX.test(organisasjonsnummer)) {
        throw new Error('Organisasjonsnummer inneholder ugyldige tegn');
    }
}
