import { DateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFeriePeriode } from '../Sak';

export interface LovbestemtFerieSøknadsdata {
    perioderMedFerie: LovbestemtFeriePeriode[];
    perioderFjernet: DateRange[];
    perioderLagtTil: DateRange[];
}
