import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { ComboboxProps, UNSAFE_Combobox } from '@navikt/ds-react';
import { useContext } from 'react';

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
    const context = useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <UNSAFE_Combobox
                        {...restProps}
                        {...field}
                        shouldAutocomplete={true}
                        error={getErrorPropForFormikInput({ field, form, context, error })}>
                        {children}
                    </UNSAFE_Combobox>
                );
            }}
        </FieldComponent>
    );
}

export default FormikCombobox;
