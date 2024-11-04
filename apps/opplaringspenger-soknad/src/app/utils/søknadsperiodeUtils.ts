import { DateRange, getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

export const getGyldigSøknadsperiode = (): DateRange => {
    return {
        from: dayjs(getDateToday()).subtract(3, 'months').startOf('month').toDate(),
        to: dayjs(getDateToday()).add(6, 'months').endOf('month').toDate(),
    };
};
