import { describe, expect, it } from 'vitest';

import {
    dateToISODateString,
    InputDateStringToISODateString,
    INVALID_DATE_VALUE,
    ISODateStringToLocalDate,
    ISODateStringToUTCDate,
} from '../dateFormatUtils';

describe('ISODateStringToLocalDate', () => {
    it('returnerer lokal midnatt med riktig dato', () => {
        const date = ISODateStringToLocalDate('2024-06-15')!;
        expect(date.getFullYear()).toBe(2024);
        expect(date.getMonth()).toBe(5);
        expect(date.getDate()).toBe(15);
    });

    it('returnerer undefined for manglende input', () => {
        expect(ISODateStringToLocalDate(undefined)).toBeUndefined();
        expect(ISODateStringToLocalDate('')).toBeUndefined();
    });

    it('returnerer undefined for ikke-eksisterende dato (feb 31)', () => {
        expect(ISODateStringToLocalDate('2024-02-31')).toBeUndefined();
    });

    it('returnerer undefined for ugyldig måned', () => {
        expect(ISODateStringToLocalDate('2024-99-01')).toBeUndefined();
    });
});

describe('dateToISODateString', () => {
    it('returnerer korrekt ISO-streng for lokal midnatt (tidssone-uavhengig)', () => {
        const date = new Date(2024, 5, 15);
        expect(dateToISODateString(date)).toBe('2024-06-15');
    });

    it(`returnerer ${INVALID_DATE_VALUE} for ugyldig dato`, () => {
        const invalid = new Date('not-a-date');
        expect(dateToISODateString(invalid)).toBe(INVALID_DATE_VALUE);
    });
});

describe('round-trip: ISODateStringToLocalDate + dateToISODateString', () => {
    it('er stabil i alle tidssoner — avdekker tidssone-loopen', () => {
        const dates = ['2024-01-01', '2024-06-15', '2024-12-31', '2000-02-29'];
        for (const iso of dates) {
            expect(dateToISODateString(ISODateStringToLocalDate(iso)!)).toBe(iso);
        }
    });
});

describe('ISODateStringToUTCDate (eksisterende funksjon, brukes ikke i datepicker lenger)', () => {
    it('returnerer UTC-midnatt Date', () => {
        const date = ISODateStringToUTCDate('2024-06-15')!;
        expect(date.getUTCFullYear()).toBe(2024);
        expect(date.getUTCMonth()).toBe(5);
        expect(date.getUTCDate()).toBe(15);
        expect(date.getUTCHours()).toBe(0);
    });
});

describe('InputDateStringToISODateString', () => {
    it('konverterer norsk datoformat korrekt', () => {
        expect(InputDateStringToISODateString('15.06.2023')).toBe('2023-06-15');
    });

    it('håndterer tosiffer år: 24 → 2024', () => {
        expect(InputDateStringToISODateString('15.06.24')).toBe('2024-06-15');
    });

    it('returnerer Invalid date for ugyldig input', () => {
        expect(InputDateStringToISODateString('ikke-en-dato')).toBe('Invalid date');
    });
});
