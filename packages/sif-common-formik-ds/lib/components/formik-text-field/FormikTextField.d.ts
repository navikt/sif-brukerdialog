/// <reference types="react" />
import { TextFieldProps } from '@navikt/ds-react';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import './formikTextField.css';
import { TextFieldWidths } from './FormikTextFieldUtils';
interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'children' | 'width'> {
    name: FieldName;
    width?: TextFieldWidths;
}
export declare type FormikTextFieldProps<FieldName, ErrorType> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & UseFastFieldProps & TestProps;
declare function FormikTextField<FieldName, ErrorType>({ name, error, validate, width, className, autoComplete, useFastField, ...restProps }: FormikTextFieldProps<FieldName, ErrorType>): JSX.Element;
export default FormikTextField;
//# sourceMappingURL=FormikTextField.d.ts.map