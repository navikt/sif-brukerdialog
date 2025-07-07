// Query keys
export { sifCommonQueryKeys } from './queryKeys';

// Types
export { type Søker } from './types/søker';
export type { BarnOppslag, BarnOppslagListe } from './types/barn';
export {
    type Arbeidsgivere,
    type Organisasjon,
    type PrivatArbeidsgiver,
    type Frilansoppdrag,
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
export {
    type DeleteMellomlagringData,
    type DeleteMellomlagringResponses,
    type DeleteMellomlagringErrors,
    type GetMellomlagringData,
    type GetMellomlagringResponses,
    type GetMellomlagringErrors,
    type GetMellomlagringResponse,
    type CreateMellomlagringData,
    type CreateMellomlagringResponses,
    type CreateMellomlagringErrors,
    type UpdateMellomlagringData,
    type UpdateMellomlagringResponses,
    type UpdateMellomlagringErrors,
    MellomlagringYtelse,
} from './types/mellomlagring';

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
export {
    useGetMellomlagring,
    useCreateMellomlagring,
    useUpdateMellomlagring,
    useDeleteMellomlagring,
    useMellomlagringService,
} from './hooks/useMellomlagring';

// API calls (for non-React usage)
export {
    hentBarn,
    hentSøker,
    hentArbeidsgivere,
    validerFritekst,
    lagreVedlegg,
    slettVedlegg,
    hentVedlegg,
    getMellomlagring,
    createMellomlagring,
    updateMellomlagring,
    deleteMellomlagring,
} from './api';
