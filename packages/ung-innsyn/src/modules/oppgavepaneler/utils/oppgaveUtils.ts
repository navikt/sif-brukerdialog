import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

/** Returner siste virkedag i måneden for gitt måned i dato. Siste virkedag er siste ukedag (man–fre) i måneden */
export const getSisteVirkedagIMåned = (dato: ISODate): ISODate => {
    let d = dayjs(dato).endOf('month');
    while (d.day() === 0 || d.day() === 6) {
        // 0 = søndag, 6 = lørdag
        d = d.subtract(1, 'day');
    }
    return dateToISODate(d);
};

/** Returner true hvis siste dag det skal rapporteres før er tidligere enn siste virkedag i måneden */
export const getOppgaveGjelderAvkortetMåned = (tilDato: ISODate): boolean => {
    const sisteVirkedagIMåned = getSisteVirkedagIMåned(tilDato);
    return dayjs(tilDato).isBefore(sisteVirkedagIMåned, 'day');
};
