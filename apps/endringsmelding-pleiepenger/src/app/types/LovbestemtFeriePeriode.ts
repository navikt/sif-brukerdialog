import { DateRange } from '@navikt/sif-common-utils/lib';

export interface LovbestemtFeriePeriode extends DateRange {
    liggerISak?: boolean;
    skalHaFerie: boolean;
}
