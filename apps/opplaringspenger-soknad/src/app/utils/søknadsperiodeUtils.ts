import { DateRange, getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

export const getTillattSøknadsperiode = (): DateRange => {
    return {
        from: dayjs(getDateToday()).subtract(3, 'years').startOf('month').toDate(),
        to: dayjs(getDateToday()).add(1, 'year').endOf('month').toDate(),
    };
};
