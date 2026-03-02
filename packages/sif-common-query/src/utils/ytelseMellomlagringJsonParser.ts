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
 * Parser JSON-streng og konverterer ISO datetime-strenger til Date-objekter.
 * Lar YYYY-MM-DD datostenger være uendret.
 * @returns Parset objekt, eller undefined hvis input er tom/falsy
 */
export const ytelseMellomlagringJsonParser = <T = unknown>(storageResponse: string): T | undefined => {
    if (!storageResponse) {
        return undefined;
    }
    return JSON.parse(storageResponse, dateStringToDateObjectMapper);
};
