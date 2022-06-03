import { CheckboxGroupProps, CheckboxProps } from '@navikt/ds-react';
import React from 'react';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
declare type LocalCheckboxProps = Omit<CheckboxProps, 'children' | 'name'> & {
    label: React.ReactNode;
} & TestProps;
interface OwnProps<FieldName> extends Omit<CheckboxGroupProps, 'name' | 'onChange' | 'value' | 'children'> {
    name: FieldName;
    checkboxes: LocalCheckboxProps[];
    afterOnChange?: (value: boolean | string[]) => void;
}
export declare type FormikCheckboxGroupProps<FieldName, ErrorType> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & UseFastFieldProps & TestProps;
declare function FormikCheckboxGroup<FieldName, ErrorType>({ name, validate, afterOnChange, legend, error, checkboxes, useFastField, ...restProps }: FormikCheckboxGroupProps<FieldName, ErrorType>): JSX.Element;
export default FormikCheckboxGroup;
//# sourceMappingURL=FormikCheckboxGroup.d.ts.map