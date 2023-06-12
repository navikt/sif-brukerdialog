import { getElement, getTestElement, getTestElementByType } from '../utils';

export const fyllUtVelkommenSide = () => {
    it('Velkommenside', () => {
        cy.visit('/');
        getTestElement('welcomingPage-harForståttRettigheterOgPlikter').within(() => {
            getTestElementByType('checkbox').click({ force: true });
        });
        getTestElement('welcomingPage-begynnsøknad').within(() => {
            getElement('button').click();
        });
    });
};
