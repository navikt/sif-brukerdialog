import { contextConfig } from '../../contextConfig';
import { enArbeidsgiverMock } from '../../../../mock-data/enArbeidsgiverMock';
import { enSakEnArbeidsgiverMock } from '../../../../mock-data/enSakEnArbeidsgiverMock';
import { cyHelpers } from './cyHelpers';

describe('Endre arbeidstid for én arbeidsgiver', () => {
    contextConfig({
        arbeidsgivere: enArbeidsgiverMock,
        saker: enSakEnArbeidsgiverMock,
    });

    beforeEach(() => {
        cyHelpers.setTestDate();
    });
    before(() => {
        cy.clearLocalStorage();
    });

    cyHelpers.startSøknad({ endreArbeidstid: true, endreLovbestemtFerie: true });
    cyHelpers.leggTilOgFjernFerie();
    cyHelpers.endreArbeidEnkeltuke();
    cyHelpers.endreArbeidFlereUker();
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummering();
    cyHelpers.bekreftOpplysningerOgSendInn();
});
