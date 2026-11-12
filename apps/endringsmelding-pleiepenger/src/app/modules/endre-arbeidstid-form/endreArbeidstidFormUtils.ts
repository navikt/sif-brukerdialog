import { Arbeidsuke } from '@app/types';
import { getDateRangeText } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

import { erKortArbeidsuke, getDagerTekst, sorterArbeidsuker } from '../../utils/arbeidsukeUtils';

interface ArbeidsukerPerÅr {
    [isoWeekYear: string]: Arbeidsuke[];
}

export const getArbeidsukerPerÅr = (arbeidsuker: Arbeidsuke[]): ArbeidsukerPerÅr => {
    const arbeidsukerPerÅr: ArbeidsukerPerÅr = {};
    arbeidsuker.sort(sorterArbeidsuker).forEach((uke) => {
        if (uke) {
            const isoWeekYear = dayjs(uke.periode.from).isoWeekYear();
            if (arbeidsukerPerÅr[isoWeekYear] === undefined) {
                arbeidsukerPerÅr[isoWeekYear] = [];
            }
            arbeidsukerPerÅr[isoWeekYear].push(uke);
        }
    });
    return arbeidsukerPerÅr;
};

export const getArbeidstidSpørsmålDescription = ({ periode }: Arbeidsuke, locale: string): string => {
    return erKortArbeidsuke(periode)
        ? getDateRangeText(periode, locale, { compact: false })
        : getDagerTekst(periode, true);
};
