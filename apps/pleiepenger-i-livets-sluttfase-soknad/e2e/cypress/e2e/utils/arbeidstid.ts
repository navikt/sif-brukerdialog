import { selectRadioByNameAndValue, submitSkjema } from './cyHelpers';

export const fyllUtArbeidstid = () => {
    it('Fyller ut arbeidstid som frilanser', () => {
        selectRadioByNameAndValue('ansattArbeidstid.0.arbeidIPeriode.jobberIPerioden', 'HELT_FRAVÆR');
        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
