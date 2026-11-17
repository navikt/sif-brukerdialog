import { Arbeidsuke } from '@app/types';
import { erKortArbeidsuke, getDagerTekst } from '@app/utils';
import dayjs from 'dayjs';

export type EndreArbeidstidIntlValues = {
    periode: string;
};

export const getEndreArbeidstidIntlValues = (uke: Arbeidsuke): EndreArbeidstidIntlValues => {
    const ukenummer = dayjs(uke.periode.from).isoWeek();
    return {
        periode: erKortArbeidsuke(uke.periode)
            ? `${getDagerTekst(uke.periode)} uke ${ukenummer}`
            : `i uke ${ukenummer}`,
    };
};
