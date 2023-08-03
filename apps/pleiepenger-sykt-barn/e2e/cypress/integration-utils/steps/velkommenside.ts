import { getTestElement, getTestElementByType } from '../utils';

export const fyllUtVelkommenSide = () => {
    it('Velkommenside', () => {
        cy.visit('/');
        cy.wait(['@getBarn', '@getSøker']);
        getTestElement('welcomingPage-harForståttRettigheterOgPlikter').within(() => {
            getTestElementByType('checkbox').click({ force: true });
        });
        getTestElement('welcomingPage-begynnsøknad').within(() => {
            cy.get('button').click();
        });
    });
};
