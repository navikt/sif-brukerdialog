import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { ComboboxProps, UNSAFE_Combobox } from '@navikt/ds-react';
import { inputPropsToRemove } from '../../utils/inputPropsToRemove';

interface OwnProps<FieldName> extends Omit<ComboboxProps, 'name'> {
    name: FieldName;
}

export type FormikComboboxProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

function FormikCombobox<FieldName, ErrorType>({
    name,
    children,
    validate,
    error,
    useFastField,
    ...restProps
}: FormikComboboxProps<FieldName, ErrorType>) {
    const [value, setValue] = React.useState<string>('');
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;

    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <UNSAFE_Combobox
                        {...restProps}
                        {...field}
                        {...inputPropsToRemove}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        onChange={setValue}
                        value={value}>
                        {children}
                    </UNSAFE_Combobox>
                );
            }}
        </FieldComponent>
    );
}

export default FormikCombobox;
