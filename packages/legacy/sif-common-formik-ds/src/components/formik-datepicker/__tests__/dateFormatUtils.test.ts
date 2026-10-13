import { describe, expect, it } from 'vitest';

import {
    dateToISODateString,
    InputDateStringToISODateString,
    InputDateStringToUTCDate,
    INVALID_DATE_VALUE,
    ISODateStringToInputDateString,
    ISODateStringToLocalDate,
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

describe('InputDateStringToISODateString', () => {
    it('konverterer norsk datoformat korrekt', () => {
        expect(InputDateStringToISODateString('15.06.2023')).toBe('2023-06-15');
    });

    it.each([
        ['15062023', '2023-06-15'],
        ['15/06/2023', '2023-06-15'],
        ['15-06-2023', '2023-06-15'],
        ['15.6.2023', '2023-06-15'],
    ])('aksepterer alternativt inputformat: %s → %s', (input, expected) => {
        expect(InputDateStringToISODateString(input)).toBe(expected);
    });

    it('håndterer tosiffer år → 2000-tallet (1910 → 2010)', () => {
        expect(InputDateStringToISODateString('15.06.10')).toBe('2010-06-15');
    });

    it('håndterer tosiffer år → 1900-tallet (1980 → 1980)', () => {
        expect(InputDateStringToISODateString('15.06.80')).toBe('1980-06-15');
    });

    it('returnerer Invalid date for ugyldig input', () => {
        expect(InputDateStringToISODateString('ikke-en-dato')).toBe(INVALID_DATE_VALUE);
    });
});

describe('InputDateStringToUTCDate', () => {
    it('returnerer UTC Date med riktig dato', () => {
        const date = InputDateStringToUTCDate('15.06.2023')!;
        expect(date).toBeDefined();
        expect(date.getUTCFullYear()).toBe(2023);
        expect(date.getUTCMonth()).toBe(5);
        expect(date.getUTCDate()).toBe(15);
    });

    it('returnerer undefined for undefined input', () => {
        expect(InputDateStringToUTCDate(undefined)).toBeUndefined();
    });

    it('returnerer undefined for ugyldig datostreng', () => {
        expect(InputDateStringToUTCDate('ikke-en-dato')).toBeUndefined();
    });
});

describe('ISODateStringToInputDateString', () => {
    it('konverterer ISO til norsk datoformat', () => {
        expect(ISODateStringToInputDateString('2023-06-15')).toBe('15.06.2023');
    });

    it('returnerer Invalid date for ugyldig ISO-streng', () => {
        expect(ISODateStringToInputDateString('ikke-en-dato')).toBe(INVALID_DATE_VALUE);
    });

    it('er stabil som round-trip med InputDateStringToISODateString', () => {
        const isoStrings = ['2024-01-01', '2024-06-15', '2024-12-31'];
        for (const iso of isoStrings) {
            expect(InputDateStringToISODateString(ISODateStringToInputDateString(iso) as string)).toBe(iso);
        }
    });
});
