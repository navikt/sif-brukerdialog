// Krever at appen har kalt initUngDeltakelseOpplyserApiDeltakerClient fra @navikt/ung-deltakelse-opplyser-api-deltaker.

// Hooks
export { kontonummerFallback, useKontonummer } from '../hooks/useKontonummer';

// API
export { hentKontonummer } from '../api/kontonummerApi';

// Types
export * from '../types/UtvidetKontonummerInfo';
