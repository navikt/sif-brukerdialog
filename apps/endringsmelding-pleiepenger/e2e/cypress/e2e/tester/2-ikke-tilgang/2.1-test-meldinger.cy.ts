import { contextConfig, mockApiBaseUrl } from '../../contextConfig';
import { enArbeidsgiverMock } from '../../data/enArbeidsgiverMock';
import { flereSakerMock } from '../../data/flereSakerMock';
import { getTestElement } from '../../utils';

const startUrl = 'http://localhost:8080';

describe('Bruker har ikke tilgang til løsningen', () => {
    describe('Ingen sak funnet', () => {
        contextConfig({ saker: [], arbeidsgivere: enArbeidsgiverMock });
        before(() => {
            cy.visit(startUrl);
            cy.intercept(`${mockApiBaseUrl}/api/innsyn/sak`, []);
        });
        it('Viser riktig melding når bruker ikke har sak', () => {
            expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
            expect(cy.get('#pageMainContent').contains('Vi kan ikke finne noen sak om pleiepenger på deg'));
        });
    });
    describe('Flere saker', () => {
        contextConfig({ saker: flereSakerMock, arbeidsgivere: enArbeidsgiverMock });
        before(() => {
            cy.visit(startUrl);
            cy.intercept(`${mockApiBaseUrl}/api/innsyn/sak`, flereSakerMock);
        });
        it('Viser riktig melding når bruker har flere saker', () => {
            expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
            expect(cy.get('#pageMainContent').contains('vi ser at du har flere saker'));
        });
    });
});
