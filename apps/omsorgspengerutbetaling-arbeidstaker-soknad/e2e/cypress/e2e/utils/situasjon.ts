import { getTestElement, selectRadio, selectRadioNo, selectRadioYes, submitSkjema } from './index';

export const fyllUtSituasjonSteg = () => {
    it('Fyll ut situasjon steg', () => {
        cy.wait(['@getArbeidsgiver']);
        getTestElement('arbeidsforhold-liste').each(($element, $index) => {
            cy.wrap($element).within(() => {
                selectRadioYes('arbeidsforhold-harHattFravær');
                selectRadioNo('arbeidsforhold-harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene');
                if ($index === 0) {
                    selectRadio('arbeidsforhold-utbetalingsårsak-nyoppstartetHosArbeidsgiver');
                    selectRadio('nyoppstartetHosArbeidsgiver-jobbetHosAnnenArbeidsgiver');
                } else {
                    selectRadio('arbeidsforhold-utbetalingsårsak-nyoppstartetHosArbeidsgiver');
                    selectRadio('arbeidsforhold-utbetalingsårsak-arbeidsgiverKonkurs');
                }
            });
        });
        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
