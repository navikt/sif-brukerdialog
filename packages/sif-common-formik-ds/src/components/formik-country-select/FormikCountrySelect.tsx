import React from 'react';
import { SelectProps } from '@navikt/ds-react';
import { Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import CountrySelect from './CountrySelect';
import { inputPropsToRemove } from '../../utils/inputPropsToRemove';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name' | 'children'> {
    name: FieldName;
    showOnlyEuAndEftaCountries?: boolean;
}

export type FormikCountrySelectProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    TestProps;

function FormikCountrySelect<FieldName, ErrorType>({
    name,
    error,
    validate,
    showOnlyEuAndEftaCountries,
    ...restProps
}: FormikCountrySelectProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const testKey = restProps['data-testid'];
    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <CountrySelect
                        {...restProps}
                        {...field}
                        {...inputPropsToRemove}
                        data-testid={testKey}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        onChange={(value) => {
                            form.setFieldValue(field.name, value);
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        showOnlyEuAndEftaCountries={showOnlyEuAndEftaCountries}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCountrySelect;
