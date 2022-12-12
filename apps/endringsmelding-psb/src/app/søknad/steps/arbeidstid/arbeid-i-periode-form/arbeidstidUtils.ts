import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, InputTime } from '@navikt/sif-common-formik-ds/lib';
import {
    dateFormatter,
    dateRangeUtils,
    durationToDecimalDuration,
    DurationWeekdays,
    getWeeksInDateRange,
    Weekday,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { IntlShape } from 'react-intl';
import { getArbeidsukeInfoIPeriode } from './arbeidIPeriodeFormConfig';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const formatTimerOgMinutter = (intl: IntlShape, time: Partial<InputTime>): string => {
    const timer = time.hours || '0';
    const minutter = time.minutes || '0';
    if (minutter === '0') {
        return intlHelper(intl, 'timer', { timer });
    }
    if (timer === '0') {
        return intlHelper(intl, 'minutter', { minutter });
    }
    return intlHelper(intl, 'timerOgMinutter', { timer, minutter });
};

export const getDurationWeekdaysNotInDurationWeekdays = (
    weekdays1: DurationWeekdays,
    weekdays2: DurationWeekdays
): Weekday[] => {
    const diff: Weekday[] = [];
    Object.keys(weekdays2).forEach((weekday) => {
        const duration = weekdays2[weekday];
        if (duration && durationToDecimalDuration(duration) > 0 && weekdays1[weekday] === undefined) {
            diff.push(weekday as Weekday);
        }
    });
    return diff;
};

export type ArbeidsukerTimerSøknadsdata = {
    periode: DateRange;
    timer: number;
}[];

export const summerArbeidstimerIArbeidsuker = (arbeidsuker: ArbeidsukerTimerSøknadsdata) => {
    return arbeidsuker.map(({ timer }) => timer || 0).reduce((prev, curr) => prev + curr, 0);
};

export const periodeInneholderToHeleArbeidsuker = (periode: DateRange): boolean => {
    const uker = getWeeksInDateRange(periode).map(getArbeidsukeInfoIPeriode);
    return uker.filter((uke) => uke.erFullArbeidsuke === true).length >= 2;
};

export const skalSvarePåOmEnJobberLiktIPerioden = (periode?: DateRange) =>
    periode ? periodeInneholderToHeleArbeidsuker(periode) : true;

// export enum ArbeidsperiodeIForholdTilSøknadsperiode {
//     'starterIPerioden' = 'starterIPerioden',
//     'slutterIPerioden' = 'slutterIPerioden',
//     'starterOgSlutterIPerioden' = 'starterOgSlutterIPerioden',
//     'gjelderHelePerioden' = 'gjelderHelePerioden',
// }

// export const getArbeidsperiodeIForholdTilSøknadsperiode = (
//     periode: OpenDateRange,
//     søknadsperiode: DateRange
// ): ArbeidsperiodeIForholdTilSøknadsperiode => {
//     if (
//         dateRangeUtils.isDateInsideDateRange(periode.from, søknadsperiode) &&
//         periode.to &&
//         dateRangeUtils.isDateInsideDateRange(periode.to, søknadsperiode)
//     ) {
//         return ArbeidsperiodeIForholdTilSøknadsperiode.starterOgSlutterIPerioden;
//     } else if (dateRangeUtils.isDateInsideDateRange(periode.from, søknadsperiode)) {
//         return ArbeidsperiodeIForholdTilSøknadsperiode.starterIPerioden;
//     } else if (periode.to && dateRangeUtils.isDateInsideDateRange(periode.to, søknadsperiode)) {
//         return ArbeidsperiodeIForholdTilSøknadsperiode.slutterIPerioden;
//     }
//     return ArbeidsperiodeIForholdTilSøknadsperiode.gjelderHelePerioden;
// };

// export const getArbeidsukerIPerioden = (periode: DateRange): ArbeidsukeInfo[] => {
//     return getWeeksInDateRange(periode)
//         .filter((uke) => dayjs(uke.from).isoWeekday() <= 5) // Ikke ta med uker som starter lørdag eller søndag
//         .map(getArbeidsukeInfoIPeriode);
// };

export const getArbeidsdagerIUkeTekst = ({ from, to }: DateRange): string => {
    const fraDag = dateFormatter.day(from);
    const tilDag = dateFormatter.day(to);
    const antallArbeidsdager = dateRangeUtils.getNumberOfDaysInDateRange({ from, to }, true);

    switch (antallArbeidsdager) {
        case 5:
            return 'hele uken';
        case 2:
            return `${fraDag} og ${tilDag}`;
        case 1:
            return `kun ${fraDag}`;
        default:
            return `${fraDag} til ${tilDag}`;
    }
};
