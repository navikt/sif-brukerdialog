import { describe, expect, it } from 'vitest';

import { countryIsMemberOfEøsOrEfta, getCountries, getCountryName } from '../countryUtils';

describe('countryUtils', () => {
    describe('getCountryName', () => {
        it('returns country name in Norwegian Bokmål for alpha3 code', () => {
            const name = getCountryName('NOR', 'nb');
            expect(name).toBe('Norge');
        });

        it('returns country name in Norwegian Bokmål for alpha2 code', () => {
            const name = getCountryName('NO', 'nb');
            expect(name).toBe('Norge');
        });

        it('returns country name in Norwegian Nynorsk', () => {
            const name = getCountryName('NOR', 'nn');
            expect(typeof name).toBe('string');
            expect(name.length).toBeGreaterThan(0);
        });

        it('handles no-NN locale as Nynorsk', () => {
            const nn = getCountryName('NOR', 'nn');
            const noNN = getCountryName('NOR', 'no-NN');
            expect(nn).toBe(noNN);
        });

        it('throws for invalid country code', () => {
            expect(() => getCountryName('ZZZ', 'nb')).toThrow();
        });

        it('returns Kosovo name using NAV alpha3 code (XXK)', () => {
            const name = getCountryName('XXK', 'nb');
            expect(typeof name).toBe('string');
            expect(name.length).toBeGreaterThan(0);
        });

        it('returns Kosovo name using alpha2 code (XK)', () => {
            const name = getCountryName('XK', 'nb');
            expect(typeof name).toBe('string');
            expect(name.length).toBeGreaterThan(0);
        });
    });

    describe('countryIsMemberOfEøsOrEfta', () => {
        it('returns true for Norway with alpha3 code', () => {
            expect(countryIsMemberOfEøsOrEfta('NOR')).toBe(true);
        });

        it('returns true for Norway with alpha2 code', () => {
            expect(countryIsMemberOfEøsOrEfta('NO')).toBe(true);
        });

        it('returns true for Sweden', () => {
            expect(countryIsMemberOfEøsOrEfta('SWE')).toBe(true);
        });

        it('returns false for United States', () => {
            expect(countryIsMemberOfEøsOrEfta('USA')).toBe(false);
        });

        it('returns false for Japan', () => {
            expect(countryIsMemberOfEøsOrEfta('JPN')).toBe(false);
        });
    });

    describe('getCountries', () => {
        it('returns all countries sorted by name', () => {
            const countries = getCountries(false, 'nb');
            expect(countries.length).toBeGreaterThan(100);

            const names = countries.map((c) => c.name);
            const sorted = [...names].sort((a, b) => a.localeCompare(b, 'nb'));
            expect(names).toEqual(sorted);
        });

        it('filters to EOS/EFTA countries', () => {
            const all = getCountries(false, 'nb');
            const eosOnly = getCountries(true, 'nb');
            expect(eosOnly.length).toBeLessThan(all.length);
            expect(eosOnly.length).toBeGreaterThan(0);
        });

        it('includes Norway in EOS list', () => {
            const eosOnly = getCountries(true, 'nb');
            expect(eosOnly.some((c) => c.alpha3 === 'NOR')).toBe(true);
        });

        it('uses alpha3 codes', () => {
            const countries = getCountries(false, 'nb');
            countries.forEach((c) => {
                expect(c.alpha3).toHaveLength(3);
            });
        });

        it('returns countries with name, alpha2, and alpha3', () => {
            const countries = getCountries(false, 'nb') as Array<{ name: string; alpha2: string; alpha3: string }>;
            countries.forEach((c) => {
                expect(c.name).toBeTruthy();
                expect(c.alpha2).toHaveLength(2);
                expect(c.alpha3).toHaveLength(3);
            });
        });

        it('returns Kosovo with NAV alpha3 code (XXK)', () => {
            const countries = getCountries(false, 'nb') as Array<{ name: string; alpha2: string; alpha3: string }>;
            const kosovo = countries.find((c) => c.alpha2 === 'XK');
            expect(kosovo).toBeDefined();
            expect(kosovo?.alpha3).toBe('XXK');
        });

        it('returns EOS countries sorted by name', () => {
            const countries = getCountries(true, 'nb');
            const names = countries.map((c) => c.name);
            const sorted = [...names].sort((a, b) => a.localeCompare(b, 'nb'));
            expect(names).toEqual(sorted);
        });

        it('supports Nynorsk locale', () => {
            const countries = getCountries(false, 'nn');
            expect(countries.length).toBeGreaterThan(0);
            expect(countries.some((c) => c.name.length > 0)).toBe(true);
        });
    });
});
