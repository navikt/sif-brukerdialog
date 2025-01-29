import { inntektFormComponents, InntektFormFields } from './InntektForm';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/src/validation';
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
            />
            {harSNInntekt ? (
                <FormLayout.QuestionBleedTop>
                    <NumberInput
                        name={InntektFormFields.snInntekt}
                        label="Oppgi hvor mye du har hatt i inntekt som selvstendig næringsdrivende i perioden?"
                        validate={getNumberValidator({ min: 0, required: true })}
                    />
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default SelvstendigNæringsdrivendeSpørsmål;
