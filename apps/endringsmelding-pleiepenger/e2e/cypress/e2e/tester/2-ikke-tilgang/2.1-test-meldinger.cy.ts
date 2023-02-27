import { contextConfig, mockApiBaseUrl } from '../../contextConfig';
import { enArbeidsgiverMock } from '../../data/enArbeidsgiverMock';
import { flereSakerMock } from '../../data/flereSakerMock';
import { enSakSN } from '../../data/enSakSN';
import { getTestElement } from '../../utils';
import { søkerMock } from '../../data/søkerMock';

const startUrl = 'http://localhost:8080';

describe('Bruker har ikke tilgang til løsningen', () => {
    describe('Ingen sak funnet', () => {
        contextConfig();
        before(() => {
            cy.visit(startUrl);
            cy.intercept(`${mockApiBaseUrl}/api/innsyn/sak`, []);
            cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, enArbeidsgiverMock);
            cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
        });
        it('Viser riktig melding når bruker ikke har sak', () => {
            expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
            expect(getTestElement('ingenSak')).to.exist;
        });
    });
    describe('Flere saker', () => {
        contextConfig();
        before(() => {
            cy.visit(startUrl);
            cy.intercept(`${mockApiBaseUrl}/api/innsyn/sak`, flereSakerMock);
            cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, enArbeidsgiverMock);
            cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
        });
        it('Viser riktig melding når bruker har flere saker', () => {
            expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
            expect(getTestElement('flereSaker')).to.exist;
        });
    });
    describe('Er SN', () => {
        contextConfig();
        before(() => {
            cy.visit(startUrl);
            cy.intercept(`${mockApiBaseUrl}/api/innsyn/sak`, enSakSN);
            cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, enArbeidsgiverMock);
            cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
        });
        it('Viser riktig melding når bruker har flere saker', () => {
            expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
            expect(getTestElement('erSN')).to.exist;
        });
    });
});
