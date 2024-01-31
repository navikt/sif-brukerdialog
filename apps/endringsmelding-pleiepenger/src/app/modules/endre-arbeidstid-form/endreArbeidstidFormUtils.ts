import { getDateRangeText } from '@navikt/sif-common-utils';
import { Arbeidsuke } from '@types';
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

export const getUkerSomEndresTekst = (arbeidsuker: Arbeidsuke[]): React.ReactNode => {
    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);
    if (Object.keys(ukerPerÅr).length > 1) {
        return 'flere år';
    }
    return 'ett år';
};

export type UkerForEndringType = {
    spørOmFørsteUke?: boolean;
    spørOmSisteUke?: boolean;
    spørOmSnittUker?: boolean;
};
export const getUkerForEndring = (arbeidsuker: Arbeidsuke[]): UkerForEndringType => {
    /** Ingen uker */
    if (arbeidsuker.length === 0) {
        return {};
    }
    /** Èn uke */
    if (arbeidsuker.length === 1) {
        return {
            spørOmFørsteUke: true,
        };
    }

    const førsteUke = arbeidsuker[0];
    const sisteUke = arbeidsuker[arbeidsuker.length - 1];
    if (arbeidsuker.length === 2) {
        /** Begge uker er komplette uker */
        if (førsteUke.antallDagerMedArbeidstid + sisteUke.antallDagerMedArbeidstid === 10) {
            return {
                spørOmSnittUker: true,
            };
        }
        return {
            spørOmFørsteUke: true,
            spørOmSisteUke: true,
        };
    }

    /** Bare fulle uker */
    const antallIkkeFulleUker = arbeidsuker.filter((uke) => uke.antallDagerMedArbeidstid !== 5).length;
    if (antallIkkeFulleUker === 0) {
        return {
            spørOmSnittUker: true,
        };
    }
    if (antallIkkeFulleUker === 2) {
        return {
            spørOmSnittUker: true,
            spørOmFørsteUke: true,
            spørOmSisteUke: true,
        };
    }

    const spørOmFørsteUke = arbeidsuker[0].antallDagerMedArbeidstid < 5;
    const spørOmSisteUke = arbeidsuker[arbeidsuker.length - 1].antallDagerMedArbeidstid < 5;

    return {
        spørOmSnittUker: true,
        spørOmFørsteUke,
        spørOmSisteUke,
    };
};

export const getArbeidstidSpørsmålDescription = ({ periode }: Arbeidsuke, locale: string): string => {
    return erKortArbeidsuke(periode)
        ? getDateRangeText(periode, locale, { compact: false })
        : getDagerTekst(periode, true);
};
