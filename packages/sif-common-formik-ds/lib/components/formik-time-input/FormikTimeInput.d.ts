/// <reference types="react" />
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { TimeInputLayoutProps, TimeInputRefProps } from './TimeInput';
import { TextFieldProps } from '@navikt/ds-react';
interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'onChange'> {
    name: FieldName;
    maxHours?: number;
    maxMinutes?: number;
    timeInputLayout?: TimeInputLayoutProps;
}
export declare type FormikTimeInputProps<FieldName, ErrorType> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & UseFastFieldProps & TimeInputRefProps & TestProps;
declare function FormikTimeInput<FieldName, ErrorType>({ label, name, validate, error, timeInputLayout, useFastField, description, ...restProps }: FormikTimeInputProps<FieldName, ErrorType>): JSX.Element;
export default FormikTimeInput;
//# sourceMappingURL=FormikTimeInput.d.ts.map