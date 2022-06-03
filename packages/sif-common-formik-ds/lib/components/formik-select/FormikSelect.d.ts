/// <reference types="react" />
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { SelectProps } from '@navikt/ds-react';
interface OwnProps<FieldName> extends Omit<SelectProps, 'name'> {
    name: FieldName;
}
export declare type FormikSelectProps<FieldName, ErrorType> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType> & UseFastFieldProps & TestProps;
declare function FormikSelect<FieldName, ErrorType>({ name, children, validate, error, useFastField, ...restProps }: FormikSelectProps<FieldName, ErrorType>): JSX.Element;
export default FormikSelect;
//# sourceMappingURL=FormikSelect.d.ts.map