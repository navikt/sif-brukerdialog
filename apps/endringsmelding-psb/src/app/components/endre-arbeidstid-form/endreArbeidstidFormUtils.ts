import dayjs from 'dayjs';
import { Arbeidsuke } from '../../types/K9Sak';

interface ArbeidsukerPerÅr {
    [isoWeekYear: string]: Arbeidsuke[];
}

const sorterArbeidsuker = (a1: Arbeidsuke, a2: Arbeidsuke): number => {
    return dayjs(a1.periode.from).isBefore(a2.periode.from) ? -1 : 1;
};

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

export const getUkerSomEndresTekst = (arbeidsuker: Arbeidsuke[]): React.ReactNode => {
    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);
    if (Object.keys(ukerPerÅr).length > 1) {
        return 'flere år';
    }
    return 'ett år';
};
