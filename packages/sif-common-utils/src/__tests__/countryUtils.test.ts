import { describe, expect, it } from 'vitest';

import { getCountries } from '../countryUtils';

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
});
