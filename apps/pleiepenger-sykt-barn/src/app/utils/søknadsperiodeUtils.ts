import { DateRange } from '@navikt/sif-common-formik-ds';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export const søkerNoeFremtid = (søknadsperiode: DateRange): boolean => {
    return dayjs(søknadsperiode.to).isSameOrAfter(dayjs(), 'day');
};

export const søkerKunFremtid = (søknadsperiode: DateRange): boolean => {
    if (dayjs(søknadsperiode.from).isSame(dayjs(), 'day') || dayjs(søknadsperiode.from).isAfter(dayjs(), 'day')) {
        return true;
    }
    return false;
};

export const søkerKunFortid = (søknadsperiode: DateRange): boolean => {
    if (dayjs(søknadsperiode.to).isBefore(dayjs(), 'day')) {
        return true;
    }
    return false;
};

export const søkerFortidOgFremtid = (søknadsperiode: DateRange): boolean => {
    if (
        dayjs(søknadsperiode.from).isBefore(dayjs(), 'day') &&
        (dayjs(søknadsperiode.to).isAfter(dayjs(), 'day') || dayjs(søknadsperiode.to).isSame(dayjs(), 'day'))
    ) {
        return true;
    }
    return false;
};
