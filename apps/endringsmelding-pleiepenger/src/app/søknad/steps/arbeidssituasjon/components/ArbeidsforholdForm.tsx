import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { getTypedFormComponents, IntlErrorObject, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';

interface Props {
    arbeidsgiver: Arbeidsgiver;
    fieldName: string;
    values: ArbeidsforholdFormValues;
}

export enum ArbeidsforholdFormField {
    erAnsatt = 'erAnsatt',
    timerPerUke = 'timerPerUke',
}

export interface ArbeidsforholdFormValues {
    [ArbeidsforholdFormField.erAnsatt]?: YesOrNo;
    [ArbeidsforholdFormField.timerPerUke]?: string;
}

const { NumberInput, YesOrNoQuestion } = getTypedFormComponents<
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
    IntlErrorObject
>();

const ArbeidsforholdForm = ({ fieldName, values }: Props) => {
    const erAnsatt = values.erAnsatt === YesOrNo.YES;
    const getFieldName = (field: ArbeidsforholdFormField): ArbeidsforholdFormField => {
        return `${fieldName}.${field}` as ArbeidsforholdFormField;
    };

    return (
        <>
            <FormBlock>
                <YesOrNoQuestion
                    name={getFieldName(ArbeidsforholdFormField.erAnsatt)}
                    validate={(value) => {
                        const error = getYesOrNoValidator()(value);
                        if (error) {
                            return {
                                key: `arbeidsforhold.validation.${ArbeidsforholdFormField.erAnsatt}.${error}`,
                                keepKeyUnaltered: true,
                            };
                        }
                        return undefined;
                    }}
                    legend="Er du ansatt her?"
                />
            </FormBlock>
            {erAnsatt && (
                <FormBlock>
                    <NumberInput
                        name={getFieldName(ArbeidsforholdFormField.timerPerUke)}
                        label="Hvor mange timer jobber du per uke i snitt?"
                        validate={(value) => {
                            const error = getNumberValidator({ allowDecimals: true, required: true, max: 100, min: 0 })(
                                value
                            );
                            return error
                                ? {
                                      key: `arbeidsforhold.validation.${ArbeidsforholdFormField.timerPerUke}.${error}`,
                                      keepKeyUnaltered: true,
                                  }
                                : undefined;
                        }}
                    />
                </FormBlock>
            )}
        </>
    );
};

export default ArbeidsforholdForm;
