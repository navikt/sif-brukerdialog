import { DateRange } from '@navikt/sif-common-utils';

export const dateErHelg = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
};

const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isBeforeDay = (a: Date, b: Date): boolean => {
    if (a.getFullYear() !== b.getFullYear()) return a.getFullYear() < b.getFullYear();
    if (a.getMonth() !== b.getMonth()) return a.getMonth() < b.getMonth();
    return a.getDate() < b.getDate();
};

const isAfterDay = (a: Date, b: Date): boolean => isBeforeDay(b, a);

const isSameOrBefore = (a: Date, b: Date): boolean => isSameDay(a, b) || isBeforeDay(a, b);
const isSameOrAfter = (a: Date, b: Date): boolean => isSameDay(a, b) || isAfterDay(a, b);

export const dateCollideWithRanges = (date: Date | undefined, ranges: DateRange[] = []): boolean => {
    if (!date || ranges.length === 0) {
        return false;
    }
    return ranges.some((range) => isSameOrAfter(date, range.from) && isSameOrBefore(date, range.to));
};

export const rangeCollideWithRanges = (range: DateRange, ranges: DateRange[] = []): boolean => {
    if (!range || !range.from || !range.to || ranges.length === 0) {
        return false;
    }
    return ranges.some((periode) => {
        const { from, to } = periode;
        return isSameOrBefore(range.from, to) && isSameOrAfter(range.to, from);
    });
};

export const toMaybeNumber = (value: string | undefined): number | undefined => {
    if (value && typeof value === 'string') {
        return parseFloat(value);
    }
    return undefined;
};
