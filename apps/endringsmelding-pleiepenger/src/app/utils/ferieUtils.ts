import {
    dateFormatter,
    DateRange,
    getDateRangesFromDates,
    getDatesInDateRange,
    getDatesInDateRanges,
    isDateWeekDay,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

export const getFeriedagerIUke = (ferieperioder: DateRange[], uke: DateRange, inkluderHelg: boolean): Date[] => {
    const feriedager = getDatesInDateRanges(ferieperioder);
    const ukedager = getDatesInDateRange(uke).filter((dagIUke) =>
        feriedager.some((dagIFerie) => dayjs(dagIUke).isSame(dagIFerie), 'day')
    );
    if (inkluderHelg === false) {
        return ukedager.filter(isDateWeekDay);
    }
    return ukedager;
};

const getSammenhengendeDagerTekst = (dager: Date[]) => {
    if (dager.length === 1) {
        return dateFormatter.day(dager[0]);
    }
    if (dager.length === 2) {
        return `${dateFormatter.day(dager[0])}, ${dateFormatter.day(dager[1])}`;
    }
    return `${dateFormatter.day(dager[0])} - ${dateFormatter.day(dager[dager.length - 1])}`;
};

export const getFeriedagerIUkeTekst = (dager: Date[]) => {
    const perioder = getDateRangesFromDates(dager);
    if (perioder.length === 1) {
        getSammenhengendeDagerTekst(dager);
    }
    return perioder
        .map((periode) => {
            return getSammenhengendeDagerTekst(getDatesInDateRange(periode));
        })
        .join(', ');
};
