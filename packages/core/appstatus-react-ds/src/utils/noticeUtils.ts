import { ISODate } from '@sif/utils';

import { SanityNotice } from '../types/sanityObjects';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isValidDate = (value: unknown): value is ISODate => {
    if (typeof value !== 'string' || !DATE_REGEX.test(value)) {
        return false;
    }
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

const isValidTime = (value: unknown): value is string => typeof value === 'string' && TIME_REGEX.test(value);

/**
 * Validerer notice fra Sanity. Kun kjente typer med gyldige verdier returneres,
 * slik at innhold som er skrevet direkte via API-et ikke vises ukontrollert.
 */
export const getValidNotice = (notices: unknown): SanityNotice | undefined => {
    if (!Array.isArray(notices) || notices.length !== 1) {
        return undefined;
    }
    const [notice] = notices;
    if (!isRecord(notice)) {
        return undefined;
    }
    switch (notice._type) {
        case 'plannedDowntimeNotice': {
            const { date, from, to } = notice;
            if (isValidDate(date) && isValidTime(from) && isValidTime(to) && to > from) {
                return { _type: 'plannedDowntimeNotice', date, from, to };
            }
            return undefined;
        }
        default:
            return undefined;
    }
};
