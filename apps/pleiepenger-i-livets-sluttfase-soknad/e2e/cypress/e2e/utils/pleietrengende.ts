import { getTestElement, selectRadioYesOrNo, submitSkjema } from './cyHelpers';

export const fyllUtOpplysningerOmPleietrengende = () => {
    it('Fyll ut opplysningene om pleietrengende  med fnr', () => {
        selectRadioYesOrNo('steg.opplysningerOmPleietrengende.flereSokere.spm', false);
        getTestElement('opplysningerOmPleietrengende.spm.navn').type('Test Testensen');
        getTestElement('opplysningerOmPleietrengende.spm.fnr').type('27857798800');
        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
