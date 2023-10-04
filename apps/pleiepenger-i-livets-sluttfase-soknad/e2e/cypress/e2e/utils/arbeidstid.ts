import { submitSkjema } from './cyHelpers';

export const fyllUtArbeidstidToMånederEnArbeidsgiver = () => {
    it('Fyller ut arbeidstid når bruker har kun én arbeidsgiver', () => {
        // August
        cy.get('.navds-accordion__item').eq(0).click();
        cy.get('.navds-accordion__item .durationWeekdaysWeek').should('be.visible');
        cy.get('legend')
            .contains('man. 14.')
            .closest('.formikTimeInput')
            .within(() => {
                cy.get('input').eq(0).type('3').blur();
                cy.get('input').eq(1).type('30').blur();
            });
        cy.get('legend')
            .contains('ons. 16.')
            .closest('.formikTimeInput')
            .within(() => {
                cy.get('input').eq(0).type('3').blur();
                cy.get('input').eq(1).type('30').blur();
            });

        // September
        cy.get('.navds-accordion__item').eq(1).click();
        cy.get('.navds-accordion__item .durationWeekdaysWeek').should('be.visible');
        cy.get('legend')
            .contains('man. 4.')
            .closest('.formikTimeInput')
            .within(() => {
                cy.get('input').eq(0).type('3').blur();
                cy.get('input').eq(1).type('30').blur();
            });
        cy.get('legend')
            .contains('man. 18.')
            .closest('.formikTimeInput')
            .within(() => {
                cy.get('input').eq(0).type('3').blur();
                cy.get('input').eq(1).type('30').blur();
            });

        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
