import { DateRange } from '@navikt/sif-common-utils';

export interface LovbestemtFeriePeriode extends DateRange {
    liggerISak?: boolean;
    skalHaFerie: boolean;
}
