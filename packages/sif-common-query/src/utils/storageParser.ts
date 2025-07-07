const dateRegExp = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);

const isISODateString = (value: any): value is string => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

const isDateStringToBeParse = (value: string): boolean => {
    return dateRegExp.test(value);
};

const dateStringToDateObjectMapper = (_key: string, value: string) => {
    if (isISODateString(value)) {
        return value;
    }
    if (!Array.isArray(value) && isDateStringToBeParse(value)) {
        return new Date(value);
    }
    return value;
};

export const storageParser = (storageResponse: string) => {
    if (storageResponse) {
        return JSON.parse(storageResponse, dateStringToDateObjectMapper);
    }
};
