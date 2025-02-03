import { TextField, TextFieldProps } from '@navikt/ds-react';
import React, { useState } from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { inputPropsToRemove } from '../../utils/inputPropsToRemove';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { getTextFieldWidthClassName, TextFieldWidths } from './FormikTextFieldUtils';
import './formikTextField.css';

interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'children' | 'width'> {
    name: FieldName;
    width?: TextFieldWidths;
    formatter?: TextFieldFormatter;
}

export type TextFieldFormatter = {
    applyFormatting: (value: string) => string;
    clearFormatting: (value: string) => string;
};

export type FormikTextFieldProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

function FormikTextField<FieldName, ErrorType>({
    name,
    error,
    validate,
    width,
    className,
    autoComplete = 'off',
    useFastField,
    label,
    formatter,
    ...restProps
}: FormikTextFieldProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    const [hasFocus, setHasFocus] = useState(false);

    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <TextField
                        {...restProps}
                        {...field}
                        {...inputPropsToRemove}
                        label={<div>{label}</div>}
                        autoComplete={autoComplete}
                        className={getTextFieldWidthClassName(width, className)}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        value={
                            formatter && !hasFocus ? formatter.applyFormatting(field.value || '') : field.value || ''
                        }
                        onBlur={
                            formatter
                                ? () => {
                                      setHasFocus(false);
                                      if (formatter) {
                                          form.setFieldValue(field.name, formatter.applyFormatting(field.value));
                                      }
                                  }
                                : undefined
                        }
                        onFocus={
                            formatter
                                ? () => {
                                      setHasFocus(true);
                                      if (formatter) {
                                          form.setFieldValue(field.name, formatter?.clearFormatting(field.value));
                                      }
                                  }
                                : undefined
                        }
                    />
                );
            }}
        </FieldComponent>
    );
}

export default FormikTextField;
