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
                validate={getYesOrNoValidator()}
            />
            {harSNInntekt ? (
                <FormLayout.QuestionBleedTop>
                    <NumberInput
                        name={InntektFormFields.snInntekt}
                        label="Oppgi hvor mye du har hatt i inntekt som selvstendig næringsdrivende i perioden?"
                        integerValue={true}
                        validate={getNumberValidator({ min: 1, required: true, allowDecimals: false })}
                    />
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default SelvstendigNæringsdrivendeSpørsmål;
