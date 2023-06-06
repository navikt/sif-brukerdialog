import { contextConfig } from '../../contextConfig';
import { enArbeidsgiverMock } from '../../data/enArbeidsgiverMock';
import { enSakEnArbeidsgiverMock } from '../../data/enSakEnArbeidsgiverMock';
import { cyHelpers } from './cyHelpers';

describe('Endre arbeidstid for én arbeidsgiver', () => {
    contextConfig({
        arbeidsgivere: enArbeidsgiverMock,
        saker: enSakEnArbeidsgiverMock,
    });

    before(() => {
        cy.clock(cyHelpers.date);
        cy.clearLocalStorage();
    });

    cyHelpers.startSøknad({ endreArbeidstid: true, endreLovbestemtFerie: true });
    cyHelpers.leggTilOgFjernFerie();
    cyHelpers.endreEnkeltuke();
    cyHelpers.endreFlereUker();
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummering();
    cyHelpers.bekreftOpplysningerOgSendInn();
});
