import {
    getElement,
    getModal,
    getTestElement,
    //getTestElementByType,
    selectRadioNo,
    selectRadioYes,
    setInputByNameValue,
    submitSkjema,
} from './index';

export const fyllUtFraværSteg = () => {
    it('Fyll ut fravær', () => {
        getTestElement('arbeidsforhold-liste').each(($element, $index) => {
            cy.wrap($element).within(() => {
                selectRadioYes('harPerioderMedFravær');
                selectRadioNo('harDagerMedDelvisFravær');
                getElement('button').contains('Legg til ny periode med fullt fravær').click();
            });
            //TODO datoer fra i dag
            getModal().within(() => {
                setInputByNameValue('fraOgMed', $index === 0 ? '14.08.2023' : '21.08.2023');
                setInputByNameValue('tilOgMed', $index === 0 ? '18.08.2023' : '28.08.2023');
                submitSkjema();
                getTestElement('typedFormikForm-submitButton').eq(0).click({ force: true });
            });
        });

        selectRadioNo('utenlandsopphold');
        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
