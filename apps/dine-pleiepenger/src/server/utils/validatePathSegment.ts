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
