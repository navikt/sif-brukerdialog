import dayjs from 'dayjs';
import { Arbeidsuke } from '../../types/K9Sak';
import { sorterArbeidsuker } from '../../utils/arbeidsukeUtils';

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

export const getUkerSomEndresTekst = (arbeidsuker: Arbeidsuke[]): React.ReactNode => {
    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);
    if (Object.keys(ukerPerÅr).length > 1) {
        return 'flere år';
    }
    return 'ett år';
};
