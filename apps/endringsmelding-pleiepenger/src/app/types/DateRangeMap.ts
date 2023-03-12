import { ISODateRange } from '@navikt/sif-common-utils/lib';

export interface DateRangeMap<T> {
    [key: ISODateRange]: T;
}
