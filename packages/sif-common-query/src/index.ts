// Query keys
export { sifCommonQueryKeys } from './queryKeys';

// Types
export { type Søker } from './types/søker';
export type { BarnOppslag, BarnOppslagListe } from '@navikt/k9-brukerdialog-prosessering-api';
export {
    type ArbeidsgivereDto,
    type OrganisasjonDto,
    type PrivatArbeidsgiverDto,
    type FrilansoppdragDto,
} from './types/arbeidsgivere';
export {
    type Friteksfelt,
    type ValiderFriteksfeltData,
    type ValiderFriteksfeltResponses,
    type ValiderFriteksfeltErrors,
    type ValiderFriteksfeltError,
} from './types/validerFritekst';
export {
    type LagreVedleggData,
    type LagreVedleggResponses,
    type LagreVedleggErrors,
    type SlettVedleggData,
    type SlettVedleggResponses,
    type SlettVedleggErrors,
    type SlettVedleggResponse,
    type HentVedleggData,
    type HentVedleggResponses,
    type HentVedleggErrors,
    type HentVedleggResponse,
} from './types/vedlegg';

// Hooks
export { useSøker } from './hooks/useSøker';
export { useBarn } from './hooks/useBarn';
export { useArbeidsgivere } from './hooks/useArbeidsgivere';
export { useValiderFritekst } from './hooks/useValiderFritekst';
export {
    useLagreVedlegg,
    useSlettVedlegg,
    useHentVedlegg,
    getVedleggIdFromResponseHeaderLocation,
} from './hooks/useVedlegg';
