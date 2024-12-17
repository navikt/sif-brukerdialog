import { DateRange, getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { OmBarnetFormSøknadsdata } from '../types/søknadsdata/Søknadsdata';

dayjs.extend(minMax);

export const getTillattSøknadsperiode = (barnetsFødselsdato?: Date): DateRange => {
    const defaultSøknadsperiode = {
        from: dayjs(getDateToday()).subtract(3, 'years').startOf('month').toDate(),
        to: dayjs(getDateToday()).add(1, 'year').endOf('month').toDate(),
    };
    return !barnetsFødselsdato
        ? defaultSøknadsperiode
        : {
              from: dayjs.max(dayjs(defaultSøknadsperiode.from), dayjs(barnetsFødselsdato)).toDate(),
              to: defaultSøknadsperiode.to,
          };
};

export const getBarnetsFødselsdato = (omBarnet?: OmBarnetFormSøknadsdata): Date | undefined => {
    switch (omBarnet?.type) {
        case 'registrerteBarn':
            return omBarnet.registrertBarn.fødselsdato;
        case 'annetBarnUtenFnr':
            return omBarnet.barnetsFødselsdato;
        default:
            return undefined;
    }
};
