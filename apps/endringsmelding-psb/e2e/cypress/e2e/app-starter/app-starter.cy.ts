import { contextConfig } from '../contextConfig';
import { getTestElement } from '../utils';

const startUrl = 'http://localhost:8080/';

const startSøknad = () => {
    it('Starter søknad', () => {
        expect(getTestElement('velkommen-header').first().contains('Velkommen GODSLIG'));
    });
};

describe('Fylle ut søknad', () => {
    contextConfig();

    describe('Med registrert barn', () => {
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
    });
});
