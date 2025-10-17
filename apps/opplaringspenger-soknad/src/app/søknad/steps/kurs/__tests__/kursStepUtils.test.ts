import { vi } from 'vitest';

import { ISODateToDate } from '@navikt/sif-common-utils';
import { startOgSluttErSammeHelg } from '../utils/kursStepUtils';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getMaybeEnv: () => 'mockedApiUrl',
        getCommonEnv: () => ({}),
        getK9SakInnsynEnv: () => ({}),
    };
});

describe('kursStepUtils', () => {
    describe('startOgSluttErSammeHelg', () => {
        const fredag = ISODateToDate('2025-09-05');
        const lørdag = ISODateToDate('2025-09-06');
        const søndag = ISODateToDate('2025-09-07');
        const mandag = ISODateToDate('2025-09-08');
        const lørdag2 = ISODateToDate('2025-09-13');

        it('Start er undefined', () => {
            expect(startOgSluttErSammeHelg(undefined, lørdag)).toBe(false);
        });
        it('Slutt er undefined', () => {
            expect(startOgSluttErSammeHelg(søndag, undefined)).toBe(false);
        });
        it('Start og slutt er undefined', () => {
            expect(startOgSluttErSammeHelg(undefined, undefined)).toBe(false);
        });

        it('Start og slutt samme dag (lørdag)', () => {
            expect(startOgSluttErSammeHelg(lørdag, lørdag)).toBe(true);
        });

        it('Start og slutt samme dag (søndag)', () => {
            expect(startOgSluttErSammeHelg(søndag, søndag)).toBe(true);
        });

        it('Start lørdag, slutt søndag (samme helg)', () => {
            expect(startOgSluttErSammeHelg(lørdag, søndag)).toBe(true);
        });

        it('Start fredag (ukedag), slutt lørdag', () => {
            expect(startOgSluttErSammeHelg(fredag, lørdag)).toBe(false);
        });

        it('Start lørdag, slutt mandag (ukedag)', () => {
            expect(startOgSluttErSammeHelg(lørdag, mandag)).toBe(false);
        });

        it('Start og slutt ukedager', () => {
            expect(startOgSluttErSammeHelg(fredag, mandag)).toBe(false);
        });

        it('Start lørdag, slutt lørdag neste uke (for lang avstand)', () => {
            expect(startOgSluttErSammeHelg(lørdag, lørdag2)).toBe(false);
        });

        it('Start fredag, slutt søndag (for lang avstand)', () => {
            expect(startOgSluttErSammeHelg(fredag, søndag)).toBe(false);
        });
        it('Start fredag, slutt mandag', () => {
            expect(startOgSluttErSammeHelg(fredag, mandag)).toBe(false);
        });
        it('Start lørdag, slutt mandag', () => {
            expect(startOgSluttErSammeHelg(lørdag, mandag)).toBe(false);
        });
        it('Start fredag, slutt lørdag', () => {
            expect(startOgSluttErSammeHelg(fredag, lørdag)).toBe(false);
        });
    });
});
