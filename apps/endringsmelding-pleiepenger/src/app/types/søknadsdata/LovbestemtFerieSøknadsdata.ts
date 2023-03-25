import { DateRange } from '@navikt/sif-common-utils/lib';
import { Feriedag, FeriedagMap } from '../../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';

export interface FeriedagerMeta {
    /** Alle feriedager, de som er uendret, fjernet og lagt til */
    alleDager: Feriedag[];
    datoerFjernet: Date[];
    datoerLagtTil: Date[];
    datoerMedFerie: Date[];
    perioderFjernet: DateRange[];
    perioderLagtTil: DateRange[];
    perioderMedFerie: DateRange[];
    erEndret: boolean;
}

export interface LovbestemtFerieSøknadsdata {
    feriedager: FeriedagMap;
    feriedagerMeta: FeriedagerMeta;
}
