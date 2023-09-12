import { isBarnOver18år } from '../omBarnetStepUtils';

describe('isBarnOver18år', () => {
    it('should return false if the person is 18 years old and today is before April 1 of the following year', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-03-31'));
        const fødselsdato = new Date('2004-09-15');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(false);
    });

    it('should return true if the person is 18 years old and today is April 1 or later of the following year', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-04-01'));
        const fødselsdato = new Date('2004-09-15');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(true);
    });

    it('should return false if the person is not yet 18 years old Before 1 April', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-03-15'));
        const fødselsdato = new Date('2020-01-15');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(false);
    });

    it('should return false if the person is not yet 18 years old After 1 April', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-04-15'));
        const fødselsdato = new Date('2020-01-15');
        const result = isBarnOver18år(fødselsdato);
        expect(result).toBe(false);
    });

    afterAll(() => jest.useRealTimers());
});
