// Krever at appen har kalt initK9BrukerdialogProsesseringApiClients fra @navikt/k9-brukerdialog-prosessering-api.

// Hooks
export { useArbeidsgivere } from '../hooks/useArbeidsgivere';
export { useRapporterInntekt, type YtelseInntektsrapportering } from '../hooks/useRapporterInntekt';
export { useRegistrerteBarn } from '../hooks/useRegistrerteBarn';
export { useSendOppgavebekreftelse, type YtelseOppgavebekreftelse } from '../hooks/useSendOppgavebekreftelse';
export { useSøker } from '../hooks/useSoker';
export { useValiderFritekst } from '../hooks/useValiderFritekst';
export { useLagreVedlegg, useSlettVedlegg } from '../hooks/useVedlegg';

// API
export { hentArbeidsgivere } from '../api/arbeidsgivereApi';
export { hentRegistrerteBarn } from '../api/registrerteBarnApi';
export { hentSøker, hentSøkerId } from '../api/sokerApi';
export { validerFritekst } from '../api/validerFritekstApi';
export {
    getVedleggApiUrl,
    getVedleggFrontendUrl,
    getVedleggIdFromResponseHeaderLocation,
    hentVedlegg,
    lagreVedlegg,
    slettVedlegg,
} from '../api/vedleggApi';
export {
    hentYtelseMellomlagring,
    oppdaterYtelseMellomlagring,
    opprettYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '../api/ytelseMellomlagringApi';

// Types
export type {
    Arbeidsgivere,
    ArbeidsgiverFrilansoppdrag,
    ArbeidsgiverOrganisasjon,
    ArbeidsgiverPrivatperson,
} from '../types/Arbeidsgivere';
export type { RegistrertBarn } from '../types/Barn';
export type { InvalidParameterProblemDetail, InvalidParameterViolation } from '../types/invalidParameterProblemDetail';
export { MellomlagringYtelse } from '../types/MellomlagringYtelse';
export type { Søker } from '../types/Soker';
