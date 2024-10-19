import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { dateRangeToISODateRange, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { GjentagelseType } from '../TidEnkeltdagForm';
import { getDagerMedNyTid, getDateRangeWithinDateRange, trimDateRangeToWeekdays } from '../utils/tidEnkeltdagUtils';
import { vi } from 'vitest';

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', commonEnv: {}, getEnv: () => '' };
});

describe('tidEnkeltdagUtils', () => {
    describe('getDagerMedNyTid', () => {
        it('velger velger to dager når gjentagelse er to faste dager innenfor en periode på to uker', () => {
            const result = getDagerMedNyTid(
                ISODateRangeToDateRange('2022-01-13/2022-01-20'),
                ISODateToDate('2022-01-13'),
                { hours: '5', minutes: '0' },
                { gjentagelsetype: GjentagelseType.hverUke },
            );
            expect(Object.keys(result).length).toBe(2);
            expect(result['2022-01-13'].hours).toEqual('5');
            expect(result['2022-01-13'].minutes).toEqual('0');
            expect(result['2022-01-20'].hours).toEqual('5');
            expect(result['2022-01-20'].minutes).toEqual('0');
        });
    });
    describe('getDateRangeWithinDateRange', () => {
        const limitRange: DateRange = ISODateRangeToDateRange('2022-05-02/2022-05-08');
        it('get correct range when dateRange exeeds limitRange', () => {
            const result = getDateRangeWithinDateRange(ISODateRangeToDateRange('2022-05-01/2022-05-09'), limitRange);
            expect(dateRangeToISODateRange(result)).toEqual('2022-05-02/2022-05-08');
        });
    });
    describe('trimDateRangeToWeekdays', () => {
        const mondayToSunday: DateRange = ISODateRangeToDateRange('2022-05-02/2022-05-08');
        const sundayToMonday: DateRange = ISODateRangeToDateRange('2022-05-08/2022-05-09');
        const sundayToSunday: DateRange = ISODateRangeToDateRange('2022-05-01/2022-05-08');
        it('trims start of date range correctly', () => {
            const result = trimDateRangeToWeekdays(sundayToMonday);
            expect(dateRangeToISODateRange(result)).toEqual('2022-05-09/2022-05-09');
        });
        it('trims end of date range correctly', () => {
            const result = trimDateRangeToWeekdays(mondayToSunday);
            expect(dateRangeToISODateRange(result)).toEqual('2022-05-02/2022-05-06');
        });
        it('trims start and end of date range correctly', () => {
            const result = trimDateRangeToWeekdays(sundayToSunday);
            expect(dateRangeToISODateRange(result)).toEqual('2022-05-02/2022-05-06');
        });
    });
});
