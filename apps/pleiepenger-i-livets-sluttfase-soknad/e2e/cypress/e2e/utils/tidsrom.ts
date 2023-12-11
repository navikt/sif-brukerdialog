import { selectRadioYesOrNo, submitSkjema } from './cyHelpers';

export const fyllUtPeriodenEnkeltAccordion = () => {
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
        selectRadioYesOrNo('pleierDuDenSykeHjemme.spm', true);
        selectRadioYesOrNo('iUtlandetIPerioden.spm', false);

        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
export const fyllUtPeriodenEnkeltKalender = () => {
    it('Fyll ut perioden enkelt', () => {
        cy.get('.daySelector__calendarWrapper').within(() => {
            const caption = cy.get('.navds-date__caption');
            caption.should('be.visible');
            caption.get('button').eq(0).click().click();

            cy.get('.rdp-table:not(.navds-responsive)')
                .first()
                .within(() => {
                    cy.get('button').contains('33').click();
                });

            caption.get('button').eq(1).click();
            cy.get('.rdp-table:not(.navds-responsive)').within(() => {
                cy.get('button').contains(4).click();
                cy.get('button').contains(11).click();
                cy.get('button').contains(18).click();
                cy.get('button').contains(25).click();
            });
        });

        selectRadioYesOrNo('pleierDuDenSykeHjemme.spm', true);
        selectRadioYesOrNo('skalJobbeIPerioden.spm', true);
        selectRadioYesOrNo('iUtlandetIPerioden.spm', false);

        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
