import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Søknad, Søknadstype } from '../types/Søknad';

require('dayjs/locale/nb');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

export const getSøknadMottattDatoValue = (søknad: Søknad): Date | string => {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
        case Søknadstype.PP_ETTERSENDELSE:
            return søknad.søknad.mottatt;
        case Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING:
            return søknad.opprettet;
    }
};

export const getSøknadMottattDato = (søknad: Søknad): Date | undefined => {
    const mottattDato = getSøknadMottattDatoValue(søknad);
    return dayjs(mottattDato).isValid() ? dayjs(mottattDato).toDate() : undefined;
};

export const formatSøknadMottattDato = (date: Date) => {
    return dayjs(date).tz('Europe/Oslo').format('dddd D. MMMM YYYY, [kl.] HH:mm');
};

export const sortSøknadEtterOpprettetDato = (a: Søknad, b: Søknad, desc: boolean = true): number => {
    const direction = desc ? 1 : -1;
    return new Date(a.opprettet) < new Date(b.opprettet) ? direction : direction * -1;
};
