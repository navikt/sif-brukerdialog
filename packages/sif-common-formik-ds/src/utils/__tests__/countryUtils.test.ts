import { getCountryName } from '../countryUtils';

describe('countryUtils', () => {
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
