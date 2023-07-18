import { getNMonthsAgo } from '../SituasjonStepUtils';

describe('getNMonthsAgo', () => {
    it('returns the correct date', () => {
        // Assuming the current date is July 18, 2023
        const numberOfMonths = 3;
        const result = getNMonthsAgo(numberOfMonths);

        // Create a date three months ago from the current date
        const expectedDate = new Date(2023, 3, 1);

        expect(result).toEqual(expectedDate);
    });
});
