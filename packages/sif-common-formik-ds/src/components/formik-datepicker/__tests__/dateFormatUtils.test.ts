import { describe, expect, it } from 'vitest';
import { dateToISODateString, ISODateStringToLocalDate, ISODateStringToUTCDate } from '../dateFormatUtils';

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
});

describe('dateToISODateString', () => {
    it('returnerer korrekt ISO-streng for lokal midnatt (tidssone-uavhengig)', () => {
        const date = new Date(2024, 5, 15);
        expect(dateToISODateString(date)).toBe('2024-06-15');
    });

    it('returnerer "Invalid Date" for ugyldig dato', () => {
        const invalid = new Date('not-a-date');
        expect(dateToISODateString(invalid)).toBe('Invalid Date');
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
