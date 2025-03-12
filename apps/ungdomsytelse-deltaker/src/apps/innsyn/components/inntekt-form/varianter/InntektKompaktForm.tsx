import { InntektFormFields, InntektFormValues } from '../types';
import { getInntektFromFormValues, inntektFormComponents } from '../inntektFormUtils';
import { getCheckedValidator, getNumberValidator } from '@navikt/sif-validation';
import { DateRange } from '@navikt/sif-common-utils';
import { VStack } from '@navikt/ds-react';

interface Props {
    periode: DateRange;
    values: InntektFormValues;
}

const InntektKompaktForm = ({ values }: Props) => {
    const { ConfirmationCheckbox, NumberInput } = inntektFormComponents;

    const inntekt = getInntektFromFormValues(values);

    return (
        <VStack gap="8" marginBlock="4 0" maxWidth="30rem" minWidth="25rem">
            <NumberInput
                name={InntektFormFields.ansattInntekt}
                label="Inntekt som ansatt/frilanser:"
                integerValue={true}
                validate={getNumberValidator({ min: 1, required: true, allowDecimals: false })}
            />
            <NumberInput
                name={InntektFormFields.ytelseInntekt}
                label="Ytelse fra Nav:"
                integerValue={true}
                validate={getNumberValidator({ min: 1, required: true, allowDecimals: false })}
            />

            {inntekt ? (
                <ConfirmationCheckbox
                    name={InntektFormFields.bekrefterInntekt}
                    label="Jeg bekrefter at opplysningene er korrekte"
                    validate={getCheckedValidator()}></ConfirmationCheckbox>
            ) : null}
        </VStack>
    );
};

export default InntektKompaktForm;
