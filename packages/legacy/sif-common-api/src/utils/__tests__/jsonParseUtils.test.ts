import { describe, expect, it } from 'vitest';

import { parseMaybeDateStringToDate } from '../jsonParseUtils';

describe('parseMaybeDateStringToDate', () => {
    describe('ISO-datostrenger (YYYY-MM-DD)', () => {
        it('parser fødselsdato til lokal midnatt — ikke UTC midnight', () => {
            /**
             * Kalenderdata som "2019-06-08" skal representere 8. juni uansett tidssone.
             * Med UTC midnight (gammel oppførsel) ville SF (UTC-7) vise 7. juni.
             * Med lokal midnatt er årstall/måned/dag identisk i alle tidssoner.
             */
            const result = parseMaybeDateStringToDate('2019-06-08');
            expect(result).toBeDefined();
            expect(result!.getFullYear()).toBe(2019);
            expect(result!.getMonth()).toBe(5); // 0-indeksert: 5 = juni
            expect(result!.getDate()).toBe(8);
        });

        it('parser årsgrense-dato korrekt (2025-01-01)', () => {
            const result = parseMaybeDateStringToDate('2025-01-01');
            expect(result!.getFullYear()).toBe(2025);
            expect(result!.getMonth()).toBe(0);
            expect(result!.getDate()).toBe(1);
        });
    });

    describe('ISO-timestamps', () => {
        it('parser UTC-timestamp og beholder UTC-tidspunktet', () => {
            const result = parseMaybeDateStringToDate('2023-06-08T10:30:00.000Z');
            expect(result).toBeDefined();
            expect(result!.toISOString()).toBe('2023-06-08T10:30:00.000Z');
        });
    });

    describe('null og undefined', () => {
        it('returnerer undefined for null', () => {
            expect(parseMaybeDateStringToDate(null)).toBeUndefined();
        });

        it('returnerer undefined for undefined', () => {
            expect(parseMaybeDateStringToDate(undefined)).toBeUndefined();
        });
    });
});
