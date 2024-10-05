import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

export const getTilgjengeligSøknadsperiode = (): DateRange => {
    return {
        from: dayjs().startOf('month').subtract(3, 'months').toDate(),
        to: dayjs().add(2, 'weeks').toDate(),
    };
};
