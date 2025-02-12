import dayjs from 'dayjs';

type ISODateString = string;

const hasValue = (value: any): boolean => value !== '' && value !== undefined && value !== null;

const ISOStringToDate = (dateString = ''): Date | undefined => getDateFromDateString(dateString);

const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return new Date(dateString);
    }
    return undefined;
};

const isISODateString = (value: any): value is ISODateString => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

export const validationUtils = {
    hasValue,
    ISOStringToDate,
    isISODateString,
    getDateFromDateString,
};
