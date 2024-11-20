import { TextFieldProps } from '@navikt/ds-react';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps } from '../../types';
import { getNumberInputFormatter, getNumberInputUnformatter } from '../../utils/numberInputUtils';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import FormikTextField from '../formik-text-field/FormikTextField';
import { TextFieldWidths } from '../formik-text-field/FormikTextFieldUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'children' | 'width'> {
    name: FieldName;
    integerValue?: boolean;
    width?: TextFieldWidths;
    useFormatting?: boolean;
}

export type FormikNumberInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    TestProps;

function FormikNumberInput<FieldName, ErrorType>({
    name,
    error,
    validate,
    autoComplete,
    width = 's',
    integerValue = false,
    useFormatting = true,
    ...restProps
}: FormikNumberInputProps<FieldName, ErrorType>) {
    const context = useContext(TypedFormikFormContext);
    const intl = useIntl();
    const formatter = useFormatting ? getNumberInputFormatter(intl) : undefined;
    const unformatter = useFormatting ? getNumberInputUnformatter() : undefined;

    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <FormikTextField
                        {...restProps}
                        {...field}
                        type="text"
                        width={width}
                        autoComplete={autoComplete || 'off'}
                        inputMode={integerValue ? 'numeric' : 'text'}
                        pattern={integerValue ? '[0-9]*' : undefined}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        formatter={formatter}
                        unformatter={unformatter}
                    />
                );
            }}
        </Field>
    );
}

export default FormikNumberInput;
