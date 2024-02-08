import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { InnsendtSøknad } from '../types/Søknad';

require('dayjs/locale/nb');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

export const formatInnsendtSøknadOpprettetDato = (date: Date) => {
    return dayjs(date).tz('Europe/Oslo').format('dddd D. MMMM YYYY, [kl.] HH:mm');
};

export const sortInnsendtSøknadEtterOpprettetDato = (
    a: InnsendtSøknad,
    b: InnsendtSøknad,
    desc: boolean = true,
): number => {
    const direction = desc ? 1 : -1;
    return new Date(a.opprettet) < new Date(b.opprettet) ? direction : direction * -1;
};
