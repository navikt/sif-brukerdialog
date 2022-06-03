/// <reference types="react" />
import { FieldsetProps } from '@navikt/ds-react';
import { TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
interface OwnProps<FieldName> extends Omit<FieldsetProps, 'name'> {
    name: FieldName;
}
export declare type FormikInputGroupProps<ErrorType, FieldName> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & UseFastFieldProps;
declare function FormikInputGroup<ErrorType, FieldName>({ name, error, validate, useFastField, ...restProps }: FormikInputGroupProps<ErrorType, FieldName>): JSX.Element;
export default FormikInputGroup;
//# sourceMappingURL=FormikInputGroup.d.ts.map