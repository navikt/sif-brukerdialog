// Barn API
export { hentBarn } from './barnApi';

// Søker API
export { hentSøker, hentSøkerId } from './søkerApi';

// Arbeidsgivere API
export { hentArbeidsgivere } from './arbeidsgivereApi';

// Valider fritekst API
export { validerFritekst } from './validerFritekstApi';

// Vedlegg API
export { lagreVedlegg, slettVedlegg, hentVedlegg, getVedleggIdFromResponseHeaderLocation } from './vedleggApi';

// Mellomlagring API
export {
    hentYtelseMellomlagring as hentMellomlagring,
    opprettYtelseMellomlagring as createMellomlagring,
    oppdaterYtelseMellomlagring as updateMellomlagring,
    slettYtelseMellomlagring as deleteMellomlagring,
} from './ytelseMellomlagringApi';
