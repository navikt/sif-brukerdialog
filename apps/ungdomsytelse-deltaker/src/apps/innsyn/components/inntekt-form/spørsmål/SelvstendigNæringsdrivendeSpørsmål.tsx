import { Box, ReadMore } from '@navikt/ds-react';
import { inntektFormComponents, InntektFormFields } from '../InntektForm';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    harSNInntekt: boolean;
}

const SelvstendigNæringsdrivendeSpørsmål = ({ harSNInntekt }: Props) => {
    const { YesOrNoQuestion, NumberInput } = inntektFormComponents;
    return (
        <>
            <YesOrNoQuestion
                name={InntektFormFields.harSNInntekt}
                legend="Har du hatt inntekt som selvstendig næringsdrivende i denne perioden?"
                description={
                    <ReadMore header="Hva er inntekt som selvstendig næringsdrivende?">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam quisquam eum enim cum.
                        Consequuntur aspernatur itaque quasi porro! Optio tempora a, id ipsa incidunt aliquid sequi aut
                        non deserunt?
                    </ReadMore>
                }
                validate={getYesOrNoValidator()}
            />
            {harSNInntekt ? (
                <FormLayout.QuestionBleedTop>
                    <Box className=" bg-deepblue-50 p-6 rounded-md">
                        <NumberInput
                            name={InntektFormFields.snInntekt}
                            label="Oppgi i hele kroner hvor mye du har hatt i inntekt som selvstendig næringsdrivende i perioden. "
                            integerValue={true}
                            validate={getNumberValidator({ min: 1, required: true, allowDecimals: false })}
                        />
                    </Box>
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default SelvstendigNæringsdrivendeSpørsmål;
