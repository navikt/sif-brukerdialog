import { contextConfig } from '../../contextConfig';
import { flereSakerMock } from '../../data/flere-saker-mock';
import { getTestElement } from '../../utils';

const startUrl = 'http://localhost:8080';

describe('Bruker har ikke tilgang til løsningen', () => {
    describe('Ingen sak funnet', () => {
        contextConfig({ sak: [] });
        before(() => {
            cy.visit(startUrl);
            cy.intercept(`/api/innsyn/sak*`, []);
        });
        it('Viser riktig melding når bruker ikke har sak', () => {
            expect(getTestElement('ingen-tilgang-heading').first().contains('Hei GODSLIG'));
            expect(cy.get('#pageMainContent').contains('Vi kan ikke finne noen sak om pleiepenger på deg'));
        });
    });
    describe('Flere saker', () => {
        contextConfig({ sak: flereSakerMock });
        before(() => {
            cy.visit(startUrl);
            cy.intercept(`/api/innsyn/sak*`, flereSakerMock);
        });
        it('Viser riktig melding når bruker har flere saker', () => {
            expect(getTestElement('ingen-tilgang-heading').first().contains('Hei GODSLIG'));
            expect(cy.get('#pageMainContent').contains('vi ser at du har flere saker'));
        });
    });
});
