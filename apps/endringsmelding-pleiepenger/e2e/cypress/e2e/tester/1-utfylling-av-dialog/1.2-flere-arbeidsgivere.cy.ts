import { contextConfig } from '../../contextConfig';
import { enSakFlereArbeidsgivereMock } from '../../../../mock-data/enSakFlereArbeidsgivereMock';
import { flereArbeidsgivereMock } from '../../../../mock-data/flereArbeidsgivereMock';
import { cyHelpers } from './cyHelpers';

describe('Endre arbeidstid for flere arbeidsgivere', () => {
    contextConfig({
        arbeidsgivere: flereArbeidsgivereMock,
        saker: enSakFlereArbeidsgivereMock,
        mellomlagring: {},
    });
    before(() => {
        cyHelpers.setTestDate();
        cy.clearLocalStorage();
        cy.visit(cyHelpers.startUrl);
    });
    cyHelpers.startSøknad({ endreArbeidstid: true });
    cyHelpers.endreArbeidEnkeltuke();
    cyHelpers.endreArbeidFlereUker();
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummering();
    cyHelpers.bekreftOpplysningerOgSendInn();
});
