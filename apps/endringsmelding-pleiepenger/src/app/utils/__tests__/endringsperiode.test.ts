import { getTillattEndringsperiode } from '../endringsperiode';

describe('getTillattEndringsperiode', () => {
    it('går fra den 1. i måneden tre måneder tilbake til siste dag i måneden 12 måneder fram', () => {
        const { from, to } = getTillattEndringsperiode(new Date(2026, 9, 26, 14, 30));
        expect(from).toEqual(new Date(2026, 6, 1));
        expect(to).toEqual(new Date(2027, 9, 31));
    });

    it('slutter 29. februar når måneden 12 måneder fram er februar i et skuddår', () => {
        const { from, to } = getTillattEndringsperiode(new Date(2027, 1, 10));
        expect(from).toEqual(new Date(2026, 10, 1));
        expect(to).toEqual(new Date(2028, 1, 29));
    });

    it('slutter 28. februar når endringsdato er 29. februar i et skuddår', () => {
        const { to } = getTillattEndringsperiode(new Date(2028, 1, 29));
        expect(to).toEqual(new Date(2029, 1, 28));
    });
});
