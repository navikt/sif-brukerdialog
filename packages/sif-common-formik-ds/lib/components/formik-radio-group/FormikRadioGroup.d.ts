import { RadioGroupProps, RadioProps } from '@navikt/ds-react';
import React from 'react';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
declare type FormikRadioProp = Omit<RadioProps, 'children' | 'name'> & {
    label: React.ReactNode;
} & TestProps;
interface OwnProps<FieldName> extends Omit<RadioGroupProps, 'name' | 'onChange' | 'children' | 'radios'> {
    name: FieldName;
    radios: FormikRadioProp[];
}
export declare type FormikRadioGroupProps<FieldName, ErrorType> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & UseFastFieldProps & TestProps;
declare function FormikRadioGroup<FieldName, ErrorType>({ name, validate, radios, error, useFastField, ...restProps }: FormikRadioGroupProps<FieldName, ErrorType>): JSX.Element;
export default FormikRadioGroup;
//# sourceMappingURL=FormikRadioGroup.d.ts.map