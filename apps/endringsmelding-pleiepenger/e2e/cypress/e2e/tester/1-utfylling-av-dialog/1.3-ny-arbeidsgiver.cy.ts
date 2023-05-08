import { contextConfig } from '../../contextConfig';
import { enSakEnArbeidsgiverMock } from '../../data/enSakEnArbeidsgiverMock';
import { flereArbeidsgivereMock } from '../../data/flereArbeidsgivereMock';
import { cyHelpers } from './cyHelpers';

describe('Endre arbeidstid for én arbeidsgiver', () => {
    contextConfig({
        arbeidsgivere: flereArbeidsgivereMock,
        saker: enSakEnArbeidsgiverMock,
    });

    before(() => {
        cy.clock(cyHelpers.date);
        cy.clearLocalStorage();
    });

    cyHelpers.startSøknad({ endreLovbestemtFerie: true });
    cyHelpers.fyllUtNyttArbeidsforhold('947064642');
    cyHelpers.leggTilOgFjernFerie();
    // cyHelpers.endreEnkeltuke();
    // cyHelpers.endreFlereUker();
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummeringNyttArbeidsforhold('947064642');
});
