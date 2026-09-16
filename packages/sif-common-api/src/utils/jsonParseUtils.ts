import { ISODateToDate } from '@navikt/sif-common-utils';
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

const getDateFromString = (value?: string): Date | undefined => {
    if (typeof value === 'string') {
        if (isISODateString(value)) {
            // Kalenderdate (YYYY-MM-DD) tolkes som lokal midnatt via ISODateToDate —
            // ikke UTC midnight, som ville gitt feil visningsdag vest for UTC.
            return ISODateToDate(value);
        }
        if (dayjs(value).isValid()) {
            // Timestamps med tid tolkes som UTC — korrekt for ISO 8601-timestamps.
            return dayjs.utc(value).toDate();
        } else {
            throw new Error(`Could not parse date string: ${value}`);
        }
    }
    return undefined;
};

export const parseMaybeDateStringToDate = (value: any): Date | undefined => {
    if (value === null) {
        return undefined;
    }
    const date = getDateFromString(value);
    if (value && !date) {
        throw new Error(`Could not parse date string: ${value}`);
    }
    return date;
};
