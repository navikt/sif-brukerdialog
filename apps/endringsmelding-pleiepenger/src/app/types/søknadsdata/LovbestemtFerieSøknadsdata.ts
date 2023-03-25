import { DateRange } from '@navikt/sif-common-utils/lib';
import { Feriedag, FeriedagMap } from '../../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { LovbestemtFeriePeriode } from '../Sak';

export interface FeriedagerMeta {
    /** Alle feriedager, de som er uendret, fjernet og lagt til */
    alleDager: Feriedag[];
    dagerFjernet: Feriedag[];
    dagerLagtTil: Feriedag[];
    dagerMedFerie: Feriedag[];
    perioderFjernet: DateRange[];
    perioderLagtTil: DateRange[];
    perioderMedFerie: DateRange[];
    erEndret: boolean;
}

export interface LovbestemtFerieSøknadsdata {
    /** Alle perioder med ferie, inkludert @perioderLagtTil */
    perioderMedFerie: LovbestemtFeriePeriode[];
    /** Perioder som er fjernet */
    perioderFjernet: DateRange[];
    /** Perioder som er lagt til - disse er også en del av @perioderMedFerie */
    perioderLagtTil: DateRange[];
    feriedager: FeriedagMap;
    feriedagerMeta: FeriedagerMeta;
}
