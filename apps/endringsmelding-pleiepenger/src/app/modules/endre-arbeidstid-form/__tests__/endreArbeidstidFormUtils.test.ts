import { arbeidsukerMockData } from '../../../../../mock/data/app/arbeidsukerMockData';
import { getArbeidsukerPerÅr, getUkerForEndring, getUkerSomEndresTekst } from '../endreArbeidstidFormUtils';

const { arbeidsukerEttÅr, arbeidsukerFlereÅr } = arbeidsukerMockData;

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

describe('getUkerForEndring', () => {
    const arbeidsuke1 = arbeidsukerEttÅr[0]; // starter torsdag
    const arbeidsuke2 = arbeidsukerEttÅr[1]; // full
    const arbeidsuke3 = arbeidsukerEttÅr[2]; // full
    const arbeidsuke4 = arbeidsukerEttÅr[3]; // full
    const arbeidsuke5 = arbeidsukerEttÅr[4]; // slutter onsdag

    it('returnerer kun false hvis det ikke er uker', () => {
        const result = getUkerForEndring([]);
        expect(result.spørOmFørsteUke).toBeFalsy();
        expect(result.spørOmSnittUker).toBeFalsy();
        expect(result.spørOmSisteUke).toBeFalsy();
    });
    it('returnerer kun første uke hvis det varer én uke', () => {
        const result = getUkerForEndring([arbeidsuke1]);
        expect(result.spørOmFørsteUke).toBeTruthy();
        expect(result.spørOmSnittUker).toBeFalsy();
        expect(result.spørOmSisteUke).toBeFalsy();
    });
    it('returnerer kun snitt uke hvis det er to uker og begge har 5 arbeidsdager', () => {
        const result = getUkerForEndring([arbeidsuke2, arbeidsuke3]);
        expect(result.spørOmFørsteUke).toBeFalsy();
        expect(result.spørOmSnittUker).toBeTruthy();
        expect(result.spørOmSisteUke).toBeFalsy();
    });
    it('returnerer første og siste uke hvis det varer to uker og det er ulik arbeidstid', () => {
        const result = getUkerForEndring([arbeidsuke1, arbeidsuke2]);
        expect(result.spørOmFørsteUke).toBeTruthy();
        expect(result.spørOmSnittUker).toBeFalsy();
        expect(result.spørOmSisteUke).toBeTruthy();
    });
    it('returnerer andre uke hvis alle arbeidsuker har 5 arbeidsdager', () => {
        const result = getUkerForEndring([arbeidsuke2, arbeidsuke3, arbeidsuke4]);
        expect(result.spørOmFørsteUke).toBeFalsy();
        expect(result.spørOmSnittUker).toBeTruthy();
        expect(result.spørOmSisteUke).toBeFalsy();
    });
    it('returnerer true på alt hvis mer enn to uker og første og siste uke ikke er full', () => {
        const result = getUkerForEndring([arbeidsuke1, arbeidsuke2, arbeidsuke3, arbeidsuke4, arbeidsuke5]);
        expect(result.spørOmFørsteUke).toBeTruthy();
        expect(result.spørOmSnittUker).toBeTruthy();
        expect(result.spørOmSisteUke).toBeTruthy();
    });
    it('returnerer true på førsteUke og snittUker hvis det er mer enn to uker og alle uker er fulle untatt første', () => {
        const result = getUkerForEndring([arbeidsuke1, arbeidsuke2, arbeidsuke3, arbeidsuke4]);
        expect(result.spørOmFørsteUke).toBeTruthy();
        expect(result.spørOmSnittUker).toBeTruthy();
        expect(result.spørOmSisteUke).toBeFalsy();
    });
    it('returnerer true på sisteUke og snittUker hvis det er mer enn to uker og alle uker er fulle untatt sisteUke', () => {
        const result = getUkerForEndring([arbeidsuke2, arbeidsuke3, arbeidsuke4, arbeidsuke5]);
        expect(result.spørOmFørsteUke).toBeFalsy();
        expect(result.spørOmSnittUker).toBeTruthy();
        expect(result.spørOmSisteUke).toBeTruthy();
    });
});
