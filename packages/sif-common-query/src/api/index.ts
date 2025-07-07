// Barn API
export { hentBarn } from './barnApi';

// Søker API
export { hentSøker } from './søkerApi';

// Arbeidsgivere API
export { hentArbeidsgivere } from './arbeidsgivereApi';

// Valider fritekst API
export { validerFritekst } from './validerFritekstApi';

// Vedlegg API
export { lagreVedlegg, slettVedlegg, hentVedlegg, getVedleggIdFromResponseHeaderLocation } from './vedleggApi';

// Mellomlagring API
export { hentMellomlagring, createMellomlagring, updateMellomlagring, deleteMellomlagring } from './mellomlagringApi';
