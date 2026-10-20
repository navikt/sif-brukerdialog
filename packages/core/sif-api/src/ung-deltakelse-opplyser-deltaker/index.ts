// Krever at appen har kalt initUngDeltakelseOpplyserApiDeltakerClient fra @sif/ung-deltakelse-opplyser-api-deltaker.

// Hooks
export { kontonummerFallback, useKontonummer } from './kontonummer/useKontonummer';

// API
export { hentKontonummer } from './kontonummer/kontonummerApi';

// Types
export { HarKontonummerEnum, type UtvidetKontonummerInfo } from './kontonummer/UtvidetKontonummerInfo';
