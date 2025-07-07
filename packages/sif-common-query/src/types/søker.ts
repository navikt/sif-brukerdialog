import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { z } from 'zod';

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

const parseMaybeDateStringToDate = (value: any): Date | undefined => {
    if (value === null) {
        return undefined;
    }
    const date = getDateFromString(value);
    if (value && !date) {
        throw new Error(`Could not parse date string: ${value}`);
    }
    return date;
};

export const søkerResponseSchema = zSøker.extend({
    fødselsdato: z.preprocess(parseMaybeDateStringToDate, z.date()),
});

export type Søker = z.infer<typeof søkerResponseSchema>;
