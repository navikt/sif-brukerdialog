import { YesOrNo } from '@sif/rhf';

/** Svarene synlighetsreglene avhenger av. undefined betyr «ikke besvart». */
interface MedlemskapSvar {
    harBoddINorge?: boolean;
    harJobbetINorge?: boolean;
    harJobbetUtenforNorge?: boolean;
}

export const yesOrNoToBoolean = (svar?: YesOrNo): boolean | undefined => {
    switch (svar) {
        case YesOrNo.YES:
            return true;
        case YesOrNo.NO:
            return false;
        default:
            return undefined;
    }
};

/**
 * Eneste kilde til sannhet for hvilke medlemskapsspørsmål som er relevante.
 * Brukes av skjemaet (hva som vises og valideres), av mappingen til søknadsdata
 * (hvilke svar som lagres) og av oppsummeringen (hva som vises).
 */
export const getMedlemskapSynlighet = ({
    harBoddINorge,
    harJobbetINorge,
    harJobbetUtenforNorge,
}: MedlemskapSvar) => ({
    harJobbetINorge: harBoddINorge === false,

    harJobbetUtenforNorge: harBoddINorge === true || (harBoddINorge === false && harJobbetINorge === true),

    bostederUtenforNorge:
        harBoddINorge === false &&
        (harJobbetINorge === false || (harJobbetINorge !== true && harJobbetUtenforNorge === true)),

    arbeidsstederUtenforNorge: harJobbetUtenforNorge === true,
});
