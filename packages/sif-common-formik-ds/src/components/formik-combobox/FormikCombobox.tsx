import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { ComboboxProps, UNSAFE_Combobox } from '@navikt/ds-react';
import { inputPropsToRemove } from '../../utils/inputPropsToRemove';

interface OwnProps<FieldName> extends Omit<ComboboxProps, 'name'> {
    name: FieldName;
    initialValue?: string;
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
    initialValue,
    ...restProps
}: FormikComboboxProps<FieldName, ErrorType>) {
    const [inputValue, setInputValue] = React.useState<string>(initialValue || '');
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;

    return (
        <FieldComponent
            validate={
                validate
                    ? (value: any) => {
                          console.log(value);
                          return validate(value, name);
                      }
                    : undefined
            }
            name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <UNSAFE_Combobox
                        {...restProps}
                        {...field}
                        {...inputPropsToRemove}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        selectedOptions={field.value ? [field.value] : []}
                        onToggleSelected={(v) => {
                            if (field.value === v) {
                                setInputValue('');
                                form.setFieldValue(field.name, '');
                            } else {
                                setInputValue(v);
                                form.setFieldValue(field.name, v);
                            }
                        }}
                        onChange={(v) => {
                            setInputValue(v);
                        }}
                        value={inputValue}>
                        {children}
                    </UNSAFE_Combobox>
                );
            }}
        </FieldComponent>
    );
}

export default FormikCombobox;
