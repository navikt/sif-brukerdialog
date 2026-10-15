// Krever at appen har kalt initK9SakInnsynApiClients fra @navikt/k9-sak-innsyn-api.

// Hooks
export { useHentSisteGyldigeVedtakForAktørId } from '../hooks/omsorgsdager-kronisk-sykt-barn/useHentSisteGyldigeVedtakForAktorId';
export type { InnvilgedeVedtak } from '../hooks/omsorgsdager-kronisk-sykt-barn/useInnvilgedeVedtakForRegistrerteBarn';
export { useInnvilgedeVedtakForRegistrerteBarn } from '../hooks/omsorgsdager-kronisk-sykt-barn/useInnvilgedeVedtakForRegistrerteBarn';

// API
export { hentSisteGyldigeVedtakForAktørId } from '../api/omsorgsdager-kronisk-sykt-barn/hentSisteGyldigeVedtakForAktorId';

// Types
export * from '../types/omsorgsdager-kronisk-sykt-barn/SisteGyldigeVedtakForAktorId';
