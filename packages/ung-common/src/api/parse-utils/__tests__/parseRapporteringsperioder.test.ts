import { dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { getTillattRapporteringsperiodeForMåned } from '../parseRapporteringsperioder';
import dayjs from 'dayjs';

describe('parseRapporteringsperioder', () => {
    describe('getTillattRapporteringsperiodeForMåned', () => {
        it('should return the correct date range for a given date', () => {
            const date = dayjs.utc('2023-10-01').toDate();
            const expected = { from: new Date('2023-10-01'), to: new Date('2023-10-06') };
            const periode = getTillattRapporteringsperiodeForMåned(date);
            expect(dateRangeToISODateRange(periode)).toEqual(dateRangeToISODateRange(expected));
        });
        it('should return the correct date range for a given date spanning daylight saving time', () => {
            const date = dayjs.utc('2025-04-06').toDate();
            const periode = getTillattRapporteringsperiodeForMåned(date);
            const expected = { from: new Date('2025-04-01'), to: new Date('2025-04-06') };
            expect(dateRangeToISODateRange(periode)).toEqual(dateRangeToISODateRange(expected));
        });
    });
});
