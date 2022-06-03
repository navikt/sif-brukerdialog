import { CheckboxProps } from '@navikt/ds-react';
import React from 'react';
import { FormError, TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
interface OwnProps<FieldName> extends Omit<CheckboxProps, 'name' | 'error' | 'children'> {
    name: FieldName;
    label: React.ReactNode;
    error?: FormError;
    afterOnChange?: (newValue: boolean) => void;
}
export declare type FormikCheckboxProps<FieldName, ErrorType> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & UseFastFieldProps & TestProps;
declare function FormikCheckbox<FieldName, ErrorType>({ name, label, validate, afterOnChange, error, useFastField, ...restProps }: FormikCheckboxProps<FieldName, ErrorType>): JSX.Element;
export default FormikCheckbox;
//# sourceMappingURL=FormikCheckbox.d.ts.map