import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

export const getTilgjengeligEndringsperiode = (): DateRange => {
    return {
        from: dayjs().startOf('month').subtract(3, 'months').toDate(),
        to: dayjs().add(4, 'weeks').toDate(),
    };
};
