// Krever at appen har kalt initK9BrukerdialogProsesseringApiClients fra @navikt/k9-brukerdialog-prosessering-api.

// Hooks
export { useArbeidsgivere } from './arbeidsgivere/useArbeidsgivere';
export { useRegistrerteBarn } from './barn/useRegistrerteBarn';
export { useValiderFritekst } from './fritekst/useValiderFritekst';
export { useRapporterInntekt, type YtelseInntektsrapportering } from './inntekt/useRapporterInntekt';
export {
    useSendOppgavebekreftelse,
    type YtelseOppgavebekreftelse,
} from './oppgavebekreftelse/useSendOppgavebekreftelse';
export { useSøker } from './soker/useSoker';
export { useLagreVedlegg, useSlettVedlegg } from './vedlegg/useVedlegg';

// API
export { hentArbeidsgivere } from './arbeidsgivere/arbeidsgivereApi';
export { hentRegistrerteBarn } from './barn/registrerteBarnApi';
export { validerFritekst } from './fritekst/validerFritekstApi';
export {
    hentYtelseMellomlagring,
    oppdaterYtelseMellomlagring,
    opprettYtelseMellomlagring,
    slettYtelseMellomlagring,
} from './mellomlagring/ytelseMellomlagringApi';
export { hentSøker, hentSøkerId } from './soker/sokerApi';
export {
    getVedleggApiUrl,
    getVedleggFrontendUrl,
    getVedleggIdFromResponseHeaderLocation,
    hentVedlegg,
    lagreVedlegg,
    slettVedlegg,
} from './vedlegg/vedleggApi';

// Types
export type { InvalidParameterProblemDetail, InvalidParameterViolation } from '../shared/invalidParameterProblemDetail';
export type {
    Arbeidsgivere,
    ArbeidsgiverFrilansoppdrag,
    ArbeidsgiverOrganisasjon,
    ArbeidsgiverPrivatperson,
} from './arbeidsgivere/Arbeidsgivere';
export type { RegistrertBarn } from './barn/Barn';
export { MellomlagringYtelse } from './mellomlagring/MellomlagringYtelse';
export type { Søker } from './soker/Soker';
