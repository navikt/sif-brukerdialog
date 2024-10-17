import { DateRange } from '@navikt/sif-common-utils';
import { add, endOfMonth, startOfMonth, sub } from 'date-fns';

export const GYLDIG_PERIODE: DateRange = {
    from: startOfMonth(sub(new Date(), { months: 3 })),
    to: endOfMonth(add(new Date(), { months: 12 })),
};
