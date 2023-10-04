import { selectRadioYesOrNo, submitSkjema } from './cyHelpers';

export const fyllUtPeriodenEnkelt = () => {
    it('Fyll ut perioden enkelt', () => {
        const augustBtn = cy.get('button').contains('august 2023');
        const juliBtn = cy.get('button').contains('juli 2023');
        const august = augustBtn.closest('.navds-accordion__item');
        const juli = juliBtn.closest('.navds-accordion__item');

        augustBtn.click();
        juliBtn.click();

        august.within(() => {
            const cal = cy.get('.rdp-table:not(.navds-responsive)');
            cy.get('.daySelector').should('be.visible');
            cal.within(() => {
                cy.get('button').contains(33).click();
            });
        });
        juli.within(() => {
            const cal = cy.get('.rdp-table:not(.navds-responsive)');
            cy.get('.daySelector').should('be.visible');
            cal.within(() => {
                cy.get('button').contains(4).click();
                cy.get('button').contains(11).click();
                cy.get('button').contains(18).click();
                cy.get('button').contains(25).click();
            });
        });
        selectRadioYesOrNo('steg.tidsrom.flereSokere.spm', false);
        selectRadioYesOrNo('iUtlandetIPerioden.spm', false);
        selectRadioYesOrNo('ferieuttakIPerioden.spm', false);

        submitSkjema();
        cy.wait('@putMellomlagring');
        // cy.wait(400);
    });
};
