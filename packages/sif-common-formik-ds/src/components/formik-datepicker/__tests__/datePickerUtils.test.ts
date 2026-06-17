import { dateUtils } from '@navikt/sif-common-utils';
import { describe, expect, it } from 'vitest';

import { datepickerUtils } from '../datepickerUtils';

const { getDateFromDateString } = datepickerUtils;
const { dateToISODate } = dateUtils;

describe('datepickerUtils.getDateFromDateString', () => {
    it('returnerer undefined for undefined input', () => {
        expect(getDateFromDateString(undefined)).toBeUndefined();
    });

    it('returnerer undefined for ugyldig format', () => {
        expect(getDateFromDateString('2020-xx-23')).toBeUndefined();
        expect(getDateFromDateString('2020-22-23')).toBeUndefined();
        expect(getDateFromDateString('15.06.2024')).toBeUndefined();
        expect(getDateFromDateString('not-a-date')).toBeUndefined();
    });

    it('returnerer undefined for ikke-eksisterende dato (feb 31)', () => {
        expect(getDateFromDateString('2024-02-31')).toBeUndefined();
    });

    it('returnerer lokal Date med riktig år, måned og dag', () => {
        const date = getDateFromDateString('2024-06-15')!;
        expect(date).toBeInstanceOf(Date);
        expect(date.getFullYear()).toBe(2024);
        expect(date.getMonth()).toBe(5); // 0-indeksert
        expect(date.getDate()).toBe(15);
    });

    it('round-trip er stabil uavhengig av tidssone — avdekker UTC-vest-feil', () => {
        const isos = ['2024-01-01', '2024-06-15', '2024-12-31', '2000-02-29'];
        for (const iso of isos) {
            const date = getDateFromDateString(iso)!;
            expect(date).toBeInstanceOf(Date);
            expect(date.getDate()).toBe(Number(iso.split('-')[2]));
            expect(dateToISODate(date)).toBe(iso);
        }
    });

    it('håndterer skuddår korrekt', () => {
        const date = getDateFromDateString('2000-02-29')!;
        expect(date.getFullYear()).toBe(2000);
        expect(date.getMonth()).toBe(1);
        expect(date.getDate()).toBe(29);
    });

    it('returnerer undefined for ugyldig skuddår (2023-02-29)', () => {
        expect(getDateFromDateString('2023-02-29')).toBeUndefined();
    });
});
