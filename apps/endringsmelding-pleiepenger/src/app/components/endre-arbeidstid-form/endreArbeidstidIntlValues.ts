import dayjs from 'dayjs';
import { Arbeidsuke } from '../../types/Sak';
import { erHelArbeidsuke, getDagerTekst } from '../../utils/arbeidsukeUtils';

export type EndreArbeidstidIntlValues = {
    periode: string;
};

export const getEndreArbeidstidIntlValues = (info: { arbeidsuker: Arbeidsuke[] }): EndreArbeidstidIntlValues => {
    let periode = '';
    if (info.arbeidsuker.length === 1) {
        const uke = info.arbeidsuker[0];
        periode = erHelArbeidsuke(uke.periode)
            ? `i uke ${dayjs(uke.periode.from).isoWeek()}`
            : `${getDagerTekst(uke.periode)} uke ${dayjs(uke.periode.from).isoWeek()}`;
    } else {
        periode = 'i de ukene du har valgt';
    }
    return {
        periode,
    };
};
