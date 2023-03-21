import { DateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFeriePeriode } from '../Sak';

export interface LovbestemtFerieSøknadsdata {
    /** Alle perioder med ferie, inkludert @perioderLagtTil */
    perioderMedFerie: LovbestemtFeriePeriode[];
    /** Perioder som er fjernet */
    perioderFjernet: DateRange[];
    /** Perioder som er lagt til - disse er også en del av @perioderMedFerie */
    perioderLagtTil: DateRange[];
}
