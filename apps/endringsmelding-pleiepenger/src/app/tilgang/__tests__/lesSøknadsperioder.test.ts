import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { describe, expect, it } from 'vitest';

import { erSakEldreEnnEndringsperiode, lesSøknadsperioder } from '../lesSøknadsperioder';
import { periode, perioder } from './testdata';

const råSak = (søknadsperiode: unknown) => ({
    søknad: { ytelse: { søknadsperiode } },
});

describe('lesSøknadsperioder', () => {
    it('leser periodene fra en sak i k9-format', () => {
        const resultat = lesSøknadsperioder(råSak(['2024-01-01/2024-01-31', '2024-03-01/2024-03-31']));
        expect(resultat).toEqual(perioder('2024-01-01/2024-01-31', '2024-03-01/2024-03-31'));
    });

    it('leser periodene selv om resten av saken har ugyldig format', () => {
        const sak = {
            barn: { fornavn: 42 },
            søknad: { ytelse: { type: 'UKJENT', søknadsperiode: ['2024-01-01/2024-01-31'] } },
        };
        expect(lesSøknadsperioder(sak)).toEqual([ISODateRangeToDateRange('2024-01-01/2024-01-31')]);
    });

    it.each([
        ['undefined', undefined],
        ['null', null],
        ['tom streng', ''],
        ['et tall', 42],
        ['et tomt objekt', {}],
    ])('returnerer undefined for %s', (_beskrivelse, sak) => {
        expect(lesSøknadsperioder(sak)).toBeUndefined();
    });

    it.each([
        ['søknadsperiode mangler', råSak(undefined)],
        ['søknadsperiode er tom liste', råSak([])],
        ['søknadsperiode ikke er en liste', råSak('2024-01-01/2024-01-31')],
        ['en periode ikke er en streng', råSak([{ from: '2024-01-01' }])],
        ['en periode ikke er en gyldig ISODateRange', råSak(['2024-01-01', '2024-03-01/2024-03-31'])],
    ])('returnerer undefined når %s', (_beskrivelse, sak) => {
        expect(lesSøknadsperioder(sak)).toBeUndefined();
    });

    it('kaster ikke for vilkårlig input', () => {
        expect(() => lesSøknadsperioder({ søknad: null })).not.toThrow();
    });
});

describe('erSakEldreEnnEndringsperiode', () => {
    const tillattEndringsperiode = periode('2024-01-01/2024-12-31');

    it('er eldre når alle periodene slutter før endringsperioden', () => {
        const resultat = erSakEldreEnnEndringsperiode(
            perioder('2023-01-01/2023-01-31', '2023-06-01/2023-06-30'),
            tillattEndringsperiode,
        );
        expect(resultat).toBe(true);
    });

    it('er ikke eldre når én periode strekker seg inn i endringsperioden', () => {
        const resultat = erSakEldreEnnEndringsperiode(
            perioder('2023-01-01/2023-01-31', '2023-12-01/2024-01-15'),
            tillattEndringsperiode,
        );
        expect(resultat).toBe(false);
    });

    it('er ikke eldre når perioden slutter på første dag i endringsperioden', () => {
        const resultat = erSakEldreEnnEndringsperiode(perioder('2023-12-01/2024-01-01'), tillattEndringsperiode);
        expect(resultat).toBe(false);
    });

    it('er eldre når perioden slutter dagen før endringsperioden', () => {
        const resultat = erSakEldreEnnEndringsperiode(perioder('2023-12-01/2023-12-31'), tillattEndringsperiode);
        expect(resultat).toBe(true);
    });

    it('er ikke eldre når saken ikke har perioder - da er den mangelfull, ikke gammel', () => {
        expect(erSakEldreEnnEndringsperiode([], tillattEndringsperiode)).toBe(false);
    });

    it('er ikke eldre når perioden ligger etter endringsperioden', () => {
        const resultat = erSakEldreEnnEndringsperiode(perioder('2026-01-01/2026-01-31'), tillattEndringsperiode);
        expect(resultat).toBe(false);
    });
});
