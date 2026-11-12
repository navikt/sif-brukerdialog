import { arbeidsukerMockData } from '../../../../../mock/data/app/arbeidsukerMockData';
import { getArbeidsukerPerÅr } from '../endreArbeidstidFormUtils';

const { arbeidsukerFlereÅr } = arbeidsukerMockData;

describe('getArbeidsukerPerÅr', () => {
    it('fordeler sorterte uker på riktig år', () => {
        const ukerOgÅr = getArbeidsukerPerÅr(arbeidsukerFlereÅr);
        expect(Object.keys(ukerOgÅr).length).toEqual(2);
        expect(ukerOgÅr[2022].length).toEqual(5);
        expect(ukerOgÅr[2023].length).toEqual(1);
        expect(ukerOgÅr[2022][0].isoDateRange).toEqual('2022-11-03/2022-11-06');
        expect(ukerOgÅr[2022][1].isoDateRange).toEqual('2022-11-07/2022-11-13');
        expect(ukerOgÅr[2022][2].isoDateRange).toEqual('2022-11-14/2022-11-20');
        expect(ukerOgÅr[2022][3].isoDateRange).toEqual('2022-11-21/2022-11-27');
        expect(ukerOgÅr[2022][4].isoDateRange).toEqual('2022-11-28/2022-11-30');
    });
});
