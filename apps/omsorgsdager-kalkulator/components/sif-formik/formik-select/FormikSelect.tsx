import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../types';
import { getErrorPropForFormikInput } from '../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { Select, SelectProps } from '@navikt/ds-react';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name'> {
    name: FieldName;
    afterOnChange?: (newValue: string) => void;
}

export type FormikSelectProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

function FormikSelect<FieldName, ErrorType>({
    name,
    children,
    validate,
    error,
    afterOnChange,
    useFastField,
    ...restProps
}: FormikSelectProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Select
                        {...restProps}
                        {...field}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        autoComplete="off"
                        value={field.value === undefined ? '' : field.value}
                        onChange={(evt) => {
                            form.setFieldValue(field.name, evt.target.value);
                            const newValue = evt.target.value;
                            if (afterOnChange) {
                                afterOnChange(newValue);
                            }
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}>
                        {children}
                    </Select>
                );
            }}
        </FieldComponent>
    );
}

export default FormikSelect;
