import {
    countryIsMemberOfEøsOrEfta,
    getCountryName,
    ensureValidAlpha3CodeForIsoCountries,
    ensureValid3AlphaCodeForNAV,
    ISO_COUNTRIES_KOSOVO_ALPHA3_CODE,
    NAV_KOSOVO_ALPHA3_CODE,
    INVALID_ISO_COUNTRIES_KOSOVO_ALPHA3_CODE,
} from '../countryUtils';

describe('countryUtils', () => {
    describe('countryIsMemberOfEøsOrEfta', () => {
        it('returns true for Iceland', () => {
            expect(countryIsMemberOfEøsOrEfta('IS')).toEqual(true);
            expect(countryIsMemberOfEøsOrEfta('ISL')).toEqual(true);
        });
        it('returns false for Algerie', () => {
            expect(countryIsMemberOfEøsOrEfta('DZ')).toEqual(false);
            expect(countryIsMemberOfEøsOrEfta('DZA')).toEqual(false);
        });
    });
    describe('ensureValidCodeForIsoCountries', () => {
        it('mapper om NAV-kode for Kosovo til riktig alpha3 kode for bruk mot ios-countries', () => {
            expect(ensureValidAlpha3CodeForIsoCountries(NAV_KOSOVO_ALPHA3_CODE)).toEqual(
                ISO_COUNTRIES_KOSOVO_ALPHA3_CODE,
            );
        });
        it('mapper om alpha2-kode for Kosovo til riktig alpha3 kode for bruk mot ios-countries', () => {
            expect(ensureValidAlpha3CodeForIsoCountries('XK')).toEqual(ISO_COUNTRIES_KOSOVO_ALPHA3_CODE);
        });
        it('mapper andre koder til riktig alpha3 kode for bruk mot ios-countries', () => {
            expect(ensureValidAlpha3CodeForIsoCountries('NO')).toEqual('NOR');
            expect(ensureValidAlpha3CodeForIsoCountries('NOR')).toEqual('NOR');
            expect(ensureValidAlpha3CodeForIsoCountries('SE')).toEqual('SWE');
        });
    });
    describe('ensureValid3AlphaCodeForNAV', () => {
        it('mapper ugyldig iso-countries kode for Kosovo til riktig alpha3 kode for bruk mot NAV', () => {
            expect(ensureValid3AlphaCodeForNAV(INVALID_ISO_COUNTRIES_KOSOVO_ALPHA3_CODE)).toEqual(
                NAV_KOSOVO_ALPHA3_CODE,
            );
        });
        it('mapper iso-countries kode for Kosovo til riktig alpha3 kode for bruk mot NAV', () => {
            expect(ensureValid3AlphaCodeForNAV('XK')).toEqual(NAV_KOSOVO_ALPHA3_CODE);
            expect(ensureValid3AlphaCodeForNAV(ISO_COUNTRIES_KOSOVO_ALPHA3_CODE)).toEqual(NAV_KOSOVO_ALPHA3_CODE);
        });
        it('mapper andre koder til riktig alpha3 kode for bruk mot NAV', () => {
            expect(ensureValid3AlphaCodeForNAV('NO')).toEqual('NOR');
            expect(ensureValid3AlphaCodeForNAV('NOR')).toEqual('NOR');
            expect(ensureValid3AlphaCodeForNAV('SE')).toEqual('SWE');
        });
    });
    describe('getCountryName', () => {
        it('returns name for nb', () => {
            const name = getCountryName('NOR', 'nb');
            expect(name).toEqual('Norge');
        });
        it('returns name for no-NB', () => {
            const name = getCountryName('NOR', 'no-NB');
            expect(name).toEqual('Norge');
        });
        it('returns name for nn', () => {
            const name = getCountryName('NOR', 'nn');
            expect(name).toEqual('Noreg');
        });
        it('returns name for no-NN', () => {
            const name = getCountryName('NOR', 'no-NN');
            expect(name).toEqual('Noreg');
        });
        it('returns fallback for unknown', () => {
            const name = getCountryName('NOR', 'blabla');
            expect(name).toEqual('Norge');
        });
    });
});
