import { Arbeidsuke } from '@app/types';
import { erKortArbeidsuke, getDagerTekst } from '@app/utils';
import dayjs from 'dayjs';

export type EndreArbeidstidIntlValues = {
    periode: string;
};

export const getEndreArbeidstidIntlValues = (info: { arbeidsuker: Arbeidsuke[] }): EndreArbeidstidIntlValues => {
    let periode = '';
    if (info.arbeidsuker.length === 1) {
        const uke = info.arbeidsuker[0];
        periode = erKortArbeidsuke(uke.periode)
            ? `${getDagerTekst(uke.periode)} uke ${dayjs(uke.periode.from).isoWeek()}`
            : `i uke ${dayjs(uke.periode.from).isoWeek()}`;
    } else {
        periode = 'i de ukene du har valgt';
    }
    return {
        periode,
    };
};
