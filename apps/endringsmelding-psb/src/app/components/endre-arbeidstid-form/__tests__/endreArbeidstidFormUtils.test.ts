import { Duration, ISODateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { Arbeidsuke } from '../../../types/K9Sak';
import { getArbeidsukerPerÅr, getUkerSomEndresTekst } from '../endreArbeidstidFormUtils';

const getMockArbeidsuke = (
    isoDateRange: ISODateRange,
    normalt: Duration = { hours: '7', minutes: '30' }
): Arbeidsuke => ({
    dagerMap: {},
    faktisk: { hours: '2', minutes: '0' },
    isoDateRange,
    normalt,
    periode: ISODateRangeToDateRange(isoDateRange),
});

const ukerEttÅr: ISODateRange[] = [
    '2022-11-03/2022-11-04',
    '2022-11-14/2022-11-18',
    '2022-11-07/2022-11-11',
    '2022-11-21/2022-11-25',
    '2022-11-28/2022-11-30',
];
const ukerFlereÅr: ISODateRange[] = [...ukerEttÅr, '2023-01-02/2023-01-04'];

const arbeidsukerFlereÅr: Arbeidsuke[] = ukerFlereÅr.map((uke) => getMockArbeidsuke(uke));
const arbeidsukerEttÅr: Arbeidsuke[] = ukerEttÅr.map((uke) => getMockArbeidsuke(uke));

describe('getArbeidsukerPerÅr', () => {
    it('fordeler sorterte uker på riktig år', () => {
        const ukerOgÅr = getArbeidsukerPerÅr(arbeidsukerFlereÅr);
        expect(Object.keys(ukerOgÅr).length).toEqual(2);
        expect(ukerOgÅr[2022].length).toEqual(5);
        expect(ukerOgÅr[2023].length).toEqual(1);
        expect(ukerOgÅr[2022][0].isoDateRange).toEqual('2022-11-03/2022-11-04');
        expect(ukerOgÅr[2022][1].isoDateRange).toEqual('2022-11-07/2022-11-11');
        expect(ukerOgÅr[2022][2].isoDateRange).toEqual('2022-11-14/2022-11-18');
        expect(ukerOgÅr[2022][3].isoDateRange).toEqual('2022-11-21/2022-11-25');
        expect(ukerOgÅr[2022][4].isoDateRange).toEqual('2022-11-28/2022-11-30');
    });
});

describe('getUkerSomEndresTekst', () => {
    it('returnerer riktig når det er kun ett år', () => {
        const tekst = getUkerSomEndresTekst(arbeidsukerEttÅr);
        expect(tekst).toEqual('ett år');
    });
    it('returnerer riktig når det er flere år', () => {
        const tekst = getUkerSomEndresTekst(arbeidsukerFlereÅr);
        expect(tekst).toEqual('flere år');
    });
});
