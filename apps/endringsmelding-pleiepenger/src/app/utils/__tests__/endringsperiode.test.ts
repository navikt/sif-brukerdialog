import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';

import { erSakEldreEnnEndringsperiode, getOppslagsperiode, getTillattEndringsperiode } from '../endringsperiode';

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

const periode = (isoDateRange: string) => ISODateRangeToDateRange(isoDateRange);

describe('erSakEldreEnnEndringsperiode', () => {
    const tillattEndringsperiode = periode('2024-01-01/2024-12-31');

    it('er eldre når alle periodene slutter før endringsperioden', () => {
        const perioder = [periode('2023-01-01/2023-01-31'), periode('2023-06-01/2023-06-30')];
        expect(erSakEldreEnnEndringsperiode(perioder, tillattEndringsperiode)).toBe(true);
    });

    it('er ikke eldre når én periode strekker seg inn i endringsperioden', () => {
        const perioder = [periode('2023-01-01/2023-01-31'), periode('2023-12-01/2024-01-15')];
        expect(erSakEldreEnnEndringsperiode(perioder, tillattEndringsperiode)).toBe(false);
    });

    it('er ikke eldre når perioden slutter på første dag i endringsperioden', () => {
        expect(erSakEldreEnnEndringsperiode([periode('2023-12-01/2024-01-01')], tillattEndringsperiode)).toBe(false);
    });

    it('er ikke eldre når saken ikke har perioder', () => {
        expect(erSakEldreEnnEndringsperiode([], tillattEndringsperiode)).toBe(false);
    });
});

describe('getOppslagsperiode', () => {
    const tillattEndringsperiode = periode('2024-01-01/2024-12-31');

    it('begrenser sakens periode til den tillatte endringsperioden', () => {
        expect(getOppslagsperiode(periode('2023-06-01/2025-06-30'), tillattEndringsperiode)).toEqual(
            periode('2024-01-01/2024-12-31'),
        );
    });

    it('gir undefined når periodene ikke overlapper', () => {
        expect(getOppslagsperiode(periode('2023-01-01/2023-06-30'), tillattEndringsperiode)).toBeUndefined();
    });
});
