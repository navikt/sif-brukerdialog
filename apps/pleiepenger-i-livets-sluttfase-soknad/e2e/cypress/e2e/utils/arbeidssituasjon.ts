import { getTestElement, selectRadioNo, selectRadioYes, submitSkjema } from './cyHelpers';

export const fyllUtArbeidssituasjonEnkelt = () => {
    it('Fyll ut arbeidssituasjon enkelt', () => {
        getTestElement('arbeidssituasjonAnsatt-liste').each(($element, index) => {
            if (index === 0) {
                cy.wrap($element).within(() => {
                    selectRadioYes('erAnsatt.spm');
                    getTestElement('ansatt.jobberNormaltTimer').type('37,5').blur();
                });
            } else {
                cy.wrap($element).within(() => {
                    selectRadioNo('erAnsatt.spm');
                    selectRadioYes('ansatt.sluttetFørSøknadsperiode.spm');
                });
            }
        });
        selectRadioNo('harHattInntektSomFrilanser');
        selectRadioNo('harHattInntektSomSN');
        selectRadioNo('opptjeningUtland.spm');
        selectRadioNo('utenlandskNæring.spm');
        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
