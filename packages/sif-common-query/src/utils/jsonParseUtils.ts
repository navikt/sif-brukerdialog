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

export const jsonParseUtils = {
    ytelseMellomlagringJsonParser,
};
