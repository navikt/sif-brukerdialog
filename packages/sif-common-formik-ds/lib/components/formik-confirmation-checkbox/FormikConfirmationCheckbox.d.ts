/// <reference types="react" />
import { ConfirmationPanelProps } from '@navikt/ds-react';
import { TestProps, TypedFormInputValidationProps } from '../../types';
interface OwnProps<FieldName> extends Omit<ConfirmationPanelProps, 'name' | 'onChange' | 'checked'> {
    name: FieldName;
}
export declare type FormikConfirmationCheckboxProps<FieldName, ErrorType> = OwnProps<FieldName> & Omit<TypedFormInputValidationProps<FieldName, ErrorType>, 'info'> & TestProps;
declare function FormikConfirmationCheckbox<FieldName, ErrorType>({ children, name, error, validate, ...restProps }: FormikConfirmationCheckboxProps<FieldName, ErrorType>): JSX.Element;
export default FormikConfirmationCheckbox;
//# sourceMappingURL=FormikConfirmationCheckbox.d.ts.map