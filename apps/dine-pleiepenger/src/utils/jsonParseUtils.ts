// const dateRegExp = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const isISODateString = (value: any): value is string => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

export const getDateFromString = (value?: string): Date | undefined => {
    if (typeof value === 'string') {
        if (isISODateString(value)) {
            return dayjs.utc(value, 'YYYY-MM-DD').toDate();
        }
        if (dayjs(value).isValid()) {
            return dayjs.utc(value).toDate();
        } else {
            throw new Error(`Could not parse date string: ${value}`);
        }
    }
    return undefined;
};

export const parseMaybeDateStringToDate = (value: any): Date | undefined => {
    const date = getDateFromString(value);
    if (value && !date) {
        throw new Error(`Could not parse date string: ${value}`);
    }
    return date;
};
