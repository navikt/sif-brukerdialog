import { TextFieldProps } from '@navikt/ds-react';
import { Field, FieldProps } from 'formik';
import { useContext } from 'react';
import { useIntl } from 'react-intl';

import { TestProps, TypedFormInputValidationProps } from '../../types';
import { inputPropsToRemove } from '../../utils/inputPropsToRemove';
import { getNumberInputFormatter } from '../../utils/numberInputUtils';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import FormikTextField from '../formik-text-field/FormikTextField';
import { TextFieldWidths } from '../formik-text-field/FormikTextFieldUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'children' | 'width'> {
    name: FieldName;
    integerValue?: boolean;
    width?: TextFieldWidths;
    useFormatting?: boolean;
    useIntlFormatting?: boolean;
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
    useIntlFormatting = true,
    ...restProps
}: FormikNumberInputProps<FieldName, ErrorType>) {
    const context = useContext(TypedFormikFormContext);
    const intl = useIntl();
    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <FormikTextField
                        {...restProps}
                        {...field}
                        {...inputPropsToRemove}
                        type="text"
                        width={width}
                        autoComplete={autoComplete || 'off'}
                        inputMode={integerValue ? 'numeric' : 'text'}
                        pattern={integerValue ? '[0-9]*' : undefined}
                        formatter={
                            useFormatting
                                ? getNumberInputFormatter(integerValue, useIntlFormatting ? intl : undefined)
                                : undefined
                        }
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                    />
                );
            }}
        </Field>
    );
}

export default FormikNumberInput;
