import { inntektFormComponents, InntektFormFields } from '../InntektForm';
import { ReadMore } from '@navikt/ds-react';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    harAnsattInntekt: boolean;
}

const ArbeidstakerSpørsmål = ({ harAnsattInntekt }: Props) => {
    const { YesOrNoQuestion, NumberInput } = inntektFormComponents;
    return (
        <>
            <YesOrNoQuestion
                name={InntektFormFields.harAnsattInntekt}
                legend="Har du hatt inntekt som arbeidstaker i denne perioden?"
                validate={getYesOrNoValidator()}
                description={
                    <ReadMore header="Hva er inntekt som arbeidstaker?">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam quisquam eum enim cum.
                        Consequuntur aspernatur itaque quasi porro! Optio tempora a, id ipsa incidunt aliquid sequi aut
                        non deserunt?
                    </ReadMore>
                }
            />
            {harAnsattInntekt ? (
                <FormLayout.QuestionBleedTop>
                    <NumberInput
                        name={InntektFormFields.ansattInntekt}
                        label="Oppgi hvor mye du har hatt i inntekt som arbeidstaker i perioden"
                        validate={getNumberValidator({ min: 1, required: true, allowDecimals: false })}
                    />
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default ArbeidstakerSpørsmål;
