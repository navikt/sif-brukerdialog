import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Pleiepengesøknad, Søknad, Søknadstype } from '../types/Søknad';

require('dayjs/locale/nb');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

export const formatSøknadOpprettetDato = (date: Date) => {
    return dayjs(date).tz('Europe/Oslo').format('dddd D. MMMM YYYY, [kl.] HH:mm');
};

export const sortSøknadEtterOpprettetDato = (a: Søknad, b: Søknad, desc: boolean = true): number => {
    const direction = desc ? 1 : -1;
    return new Date(a.opprettet) < new Date(b.opprettet) ? direction : direction * -1;
};

export const getPleiepengesøknader = (søknader: Søknad[]): Pleiepengesøknad[] => {
    return søknader.filter((søknad) => søknad.søknadstype === Søknadstype.PP_SYKT_BARN) as Pleiepengesøknad[];
};
