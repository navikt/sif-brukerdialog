import { inntektFormComponents, InntektFormFields } from './InntektForm';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    harYtelseInntekt: boolean;
}

const YtelseSpørsmål = ({ harYtelseInntekt }: Props) => {
    const { YesOrNoQuestion, NumberInput } = inntektFormComponents;
    return (
        <>
            <YesOrNoQuestion
                name={InntektFormFields.harYtelseInntekt}
                legend="Har du hatt mottatt ytelser fra Nav i denne perioden?"
            />
            {harYtelseInntekt ? (
                <FormLayout.QuestionBleedTop>
                    <NumberInput
                        name={InntektFormFields.ytelseInntekt}
                        label="Oppgi hvor mye du har mottatt i ytelser fra Nav i perioden"
                        validate={getNumberValidator({ min: 0, required: true })}
                    />
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default YtelseSpørsmål;
