import { contextConfig } from '../../contextConfig';
import { enSakFlereArbeidsgivereMock } from '../../data/enSakFlereArbeidsgivereMock';
import { flereArbeidsgivereMock } from '../../data/flereArbeidsgivereMock';
import { cyHelpers } from './cyHelpers';

describe('Endre arbeidstid for flere arbeidsgivere', () => {
    contextConfig({
        arbeidsgivere: flereArbeidsgivereMock,
        saker: enSakFlereArbeidsgivereMock,
        mellomlagring: {},
    });
    before(() => {
        cy.clock(cyHelpers.date);
        cy.clearLocalStorage();
        cy.visit(cyHelpers.startUrl);
    });
    cyHelpers.startSøknad({ endreArbeidstid: true });
    cyHelpers.endreEnkeltuke();
    cyHelpers.endreFlereUker();
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummering();
    cyHelpers.bekreftOpplysningerOgSendInn();
});
