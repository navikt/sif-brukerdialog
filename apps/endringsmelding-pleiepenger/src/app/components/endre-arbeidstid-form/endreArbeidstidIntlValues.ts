import dayjs from 'dayjs';
import { Arbeidsuke } from '../../types/Sak';

export type EndreArbeidstidIntlValues = {
    periode: string;
};

export const getEndreArbeidstidIntlValues = (info: { arbeidsuker: Arbeidsuke[] }): EndreArbeidstidIntlValues => {
    let periode = '';
    if (info.arbeidsuker.length === 1) {
        const uke = info.arbeidsuker[0];
        periode = `uke ${dayjs(uke.periode.from).isoWeek()}`;
    } else {
        periode = 'ukene du har valgt';
    }
    return {
        periode,
    };
};
