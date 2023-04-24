import { DateRange, ISODateRangeToDateRange } from '..';
import { dateRangeFormatter } from '../dateRangeFormatter';

describe('dateRangeFormatter', () => {
    const dateRange: DateRange = ISODateRangeToDateRange('2022-01-01/2022-01-02');
    describe('dateRange with different from and to date', () => {
        it('returns correct string for default values', () => {
            const result = dateRangeFormatter.getDateRangeText(dateRange);
            expect(result).toEqual('01.01.2022 - 02.01.2022');
        });

        it('returns correct string; compact: true', () => {
            const result = dateRangeFormatter.getDateRangeText(dateRange, { compact: false });
            expect(result).toEqual('1. januar 2022 - 2. januar 2022');
        });

        it('returns correct string; compact: true, includeDayNames: true', () => {
            const result = dateRangeFormatter.getDateRangeText(dateRange, { compact: false, includeDayName: true });
            expect(result).toEqual('lørdag 1. januar 2022 - søndag 2. januar 2022');
        });
        it('returns correct string; compact: false, includeDayNames: true', () => {
            const result = dateRangeFormatter.getDateRangeText(dateRange, { includeDayName: true });
            expect(result).toEqual('lørdag 01.01.2022 - søndag 02.01.2022');
        });
    });
    describe('dateRange with same from and to date', () => {
        const dateRange: DateRange = ISODateRangeToDateRange('2022-01-01/2022-01-01');
        it('returns correct string for default values', () => {
            const result = dateRangeFormatter.getDateRangeText(dateRange);
            expect(result).toEqual('01.01.2022');
        });

        it('returns correct string; compact: true', () => {
            const result = dateRangeFormatter.getDateRangeText(dateRange, { compact: false });
            expect(result).toEqual('1. januar 2022');
        });

        it('returns correct string; compact: true, includeDayNames: true', () => {
            const result = dateRangeFormatter.getDateRangeText(dateRange, { compact: false, includeDayName: true });
            expect(result).toEqual('lørdag 1. januar 2022');
        });
        it('returns correct string; compact: false, includeDayNames: true', () => {
            const result = dateRangeFormatter.getDateRangeText(dateRange, { includeDayName: true });
            expect(result).toEqual('lørdag 01.01.2022');
        });
    });
});
