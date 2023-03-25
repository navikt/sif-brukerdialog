import { DateRange } from '@navikt/sif-common-utils/lib';
import { Feriedag, FeriedagMap } from '../../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { LovbestemtFeriePeriode } from '../LovbestemtFeriePeriode';

export interface FeriedagerMeta {
    /** Alle feriedager, de som er uendret, fjernet og lagt til */
    alleDager: Feriedag[];
    datoerFjernet: Date[];
    datoerLagtTil: Date[];
    datoerMedFerie: Date[];
    datoerUendret: Date[];
    perioderFjernet: DateRange[];
    perioderLagtTil: DateRange[];
    perioderUendret: DateRange[];
    ferieperioder: LovbestemtFeriePeriode[];
    erEndret: boolean;
}

export interface LovbestemtFerieSøknadsdata {
    feriedager: FeriedagMap;
    feriedagerMeta: FeriedagerMeta;
}
