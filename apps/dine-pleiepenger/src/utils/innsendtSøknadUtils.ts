import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
    InnsendtPleiepengerEndringsmelding,
    InnsendtPleiepengerEttersendelse,
    InnsendtPleiepengesøknad,
    InnsendtSøknad,
    InnsendtSøknadstype,
} from '../types/InnsendtSøknad';

// eslint-disable-next-line @typescript-eslint/no-require-imports
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

export const getPleiepengesøknader = (søknader: InnsendtSøknad[]): InnsendtPleiepengesøknad[] => {
    return søknader.filter(
        (søknad) => søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN,
    ) as InnsendtPleiepengesøknad[];
};
export const getEndringsmeldinger = (søknader: InnsendtSøknad[]): InnsendtPleiepengerEndringsmelding[] => {
    return søknader.filter(
        (søknad) => søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN_ENDRINGSMELDING,
    ) as InnsendtPleiepengerEndringsmelding[];
};
export const getEttersendelser = (søknader: InnsendtSøknad[]): InnsendtPleiepengerEttersendelse[] => {
    return søknader.filter(
        (søknad) => søknad.søknadstype === InnsendtSøknadstype.PP_ETTERSENDELSE,
    ) as InnsendtPleiepengerEttersendelse[];
};
