import { Box, ReadMore } from '@navikt/ds-react';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FormLayout } from '@navikt/sif-common-ui';
import { inntektFormComponents } from '../inntektFormUtils';
import { InntektFormFields } from '../types';

interface Props {
    harArbeidstakerOgFrilansInntekt: boolean;
}

const ArbeidstakerFrilanserSpørsmål = ({ harArbeidstakerOgFrilansInntekt }: Props) => {
    const { YesOrNoQuestion, NumberInput } = inntektFormComponents;
    return (
        <>
            <YesOrNoQuestion
                name={InntektFormFields.harArbeidstakerOgFrilansInntekt}
                legend="Har du hatt inntekt som arbeidstaker eller frilanser i denne perioden?"
                validate={getYesOrNoValidator()}
                description={
                    <ReadMore header="Hva er inntekt som arbeidstaker eller frilanser?">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam quisquam eum enim cum.
                        Consequuntur aspernatur itaque quasi porro! Optio tempora a, id ipsa incidunt aliquid sequi aut
                        non deserunt?
                    </ReadMore>
                }
            />

            {harArbeidstakerOgFrilansInntekt ? (
                <FormLayout.QuestionBleedTop>
                    <Box className=" bg-deepblue-50 p-6 rounded-md">
                        <NumberInput
                            name={InntektFormFields.ansattInntekt}
                            label="Oppgi i hele kroner hvor mye du har hatt i inntekt som arbeidstaker eller frilanser i perioden."
                            integerValue={true}
                            validate={getNumberValidator({ min: 1, required: true, allowDecimals: false })}
                        />
                    </Box>
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default ArbeidstakerFrilanserSpørsmål;
