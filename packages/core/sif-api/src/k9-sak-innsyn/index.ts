// Krever at appen har kalt initK9SakInnsynApiClients fra @navikt/k9-sak-innsyn-api.

// Hooks
export { useHentSisteGyldigeVedtakForAktørId } from './vedtak/useHentSisteGyldigeVedtakForAktorId';
export type { InnvilgedeVedtak } from './vedtak/useInnvilgedeVedtakForRegistrerteBarn';
export { useInnvilgedeVedtakForRegistrerteBarn } from './vedtak/useInnvilgedeVedtakForRegistrerteBarn';

// API
export { hentSisteGyldigeVedtakForAktørId } from './vedtak/vedtakApi';

// Types
export type { SisteGyldigeVedtakForAktørId } from './vedtak/SisteGyldigeVedtakForAktorId';
