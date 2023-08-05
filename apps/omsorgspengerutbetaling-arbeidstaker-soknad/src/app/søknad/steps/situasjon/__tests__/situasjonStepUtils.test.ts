import dayjs from 'dayjs';
import { getNMonthsAgo } from '../SituasjonStepUtils';

describe('getNMonthsAgo', () => {
    it('returns the correct date', () => {
        const numberOfMonths = 3;
        const result = getNMonthsAgo(numberOfMonths);

        const expectedDate = dayjs().subtract(numberOfMonths, 'month').startOf('month').toDate();

        expect(result).toEqual(expectedDate);
    });
});
