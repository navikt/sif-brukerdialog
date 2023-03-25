import { DateRange } from '@navikt/sif-common-utils/lib';
import { Feriedag, FeriedagMap } from '../../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { LovbestemtFeriePeriode } from '../Sak';

export interface FeriedagerMeta {
    feriedagerFjernet: Feriedag[];
    feriedagerLagtTil: Feriedag[];
    alleFeriedager: Feriedag[];
    perioderFjernet: DateRange[];
    perioderLagtTil: DateRange[];
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
