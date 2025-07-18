import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const isoDateRegExp = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTimeRegExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

// Mapper for bruk med JSON.parse: konverterer ISO datetime til Date, men lar YYYY-MM-DD være streng
const dateStringToDateObjectMapper = (_key: string, value: any) => {
    if (typeof value === 'string') {
        if (isoDateRegExp.test(value)) {
            return value;
        }
        if (isoDateTimeRegExp.test(value)) {
            return new Date(value);
        }
    }
    return value;
};

/**
 * Erstatter date-strenger i JSON med Date-objekter (kun ISO datetime)
 */
const ytelseMellomlagringJsonParser = (storageResponse: string) => {
    if (storageResponse) {
        return JSON.parse(storageResponse, dateStringToDateObjectMapper);
    }
};

/**
 * Parser en streng (YYYY-MM-DD eller ISO datetime) til Date-objekt, eller undefined/null hvis ugyldig/ikke string
 */
const getDateFromString = (value?: string): Date | undefined => {
    if (typeof value !== 'string') return undefined;
    const date = isoDateRegExp.test(value) ? dayjs.utc(value, 'YYYY-MM-DD') : dayjs.utc(value);
    if (date.isValid()) {
        return date.toDate();
    }
    throw new Error(`Could not parse date string: ${value}`);
};

const parseMaybeDateStringToDate = (value: any): Date | undefined => {
    if (value === null || value === undefined) {
        return undefined;
    }
    return getDateFromString(value);
};

export const jsonParseUtils = {
    ytelseMellomlagringJsonParser,
    parseMaybeDateStringToDate,
};
