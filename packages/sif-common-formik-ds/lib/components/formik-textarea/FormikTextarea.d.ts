/// <reference types="react" />
import { TextareaProps } from '@navikt/ds-react';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
interface OwnProps<FieldName> extends Omit<TextareaProps, 'name' | 'defaultValue'> {
    name: FieldName;
}
export declare type FormikTextareaProps<FieldName, ErrorType> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & UseFastFieldProps & TestProps;
declare function FormikTextarea<FieldName, ErrorType>({ name, validate, error, useFastField, ...restProps }: FormikTextareaProps<FieldName, ErrorType>): JSX.Element;
export default FormikTextarea;
//# sourceMappingURL=FormikTextarea.d.ts.map