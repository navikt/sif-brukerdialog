import { Box, ReadMore } from '@navikt/ds-react';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-common-validation';
import { FormLayout } from '@navikt/sif-common-ui';
import { inntektFormComponents } from '../inntektFormUtils';
import { InntektFormFields } from '../types';

interface Props {
    harInntektFraYtelse: boolean;
}

const YtelseSpørsmål = ({ harInntektFraYtelse }: Props) => {
    const { YesOrNoQuestion, NumberInput } = inntektFormComponents;
    return (
        <>
            <YesOrNoQuestion
                name={InntektFormFields.harInntektFraYtelse}
                legend="Har du hatt mottatt ytelser fra Nav i denne perioden?"
                description={
                    <ReadMore header="Om Nav-ytelser som inntekt og hvilke ytelser som skal tas med">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam quisquam eum enim cum.
                        Consequuntur aspernatur itaque quasi porro! Optio tempora a, id ipsa incidunt aliquid sequi aut
                        non deserunt?
                    </ReadMore>
                }
                validate={getYesOrNoValidator()}
            />
            {harInntektFraYtelse ? (
                <FormLayout.QuestionBleedTop>
                    <Box className=" bg-deepblue-50 p-6 rounded-md">
                        <NumberInput
                            name={InntektFormFields.ytelseInntekt}
                            label="Oppgi i hele kroner hvor mye du har mottatt i ytelser fra Nav i perioden."
                            integerValue={true}
                            validate={getNumberValidator({ min: 1, required: true, allowDecimals: false })}
                        />
                    </Box>
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default YtelseSpørsmål;
