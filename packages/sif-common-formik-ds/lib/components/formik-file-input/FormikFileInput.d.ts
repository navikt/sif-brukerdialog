import React from 'react';
import { ArrayHelpers } from 'formik';
import { FormError, TypedFormInputValidationProps } from '../../types';
import { TextFieldProps } from '@navikt/ds-react';
interface OwnProps<FieldName> {
    name: FieldName;
    legend: string;
    description?: React.ReactNode;
    buttonLabel: string;
    accept: string;
    multiple?: boolean;
    error?: FormError;
    onFilesSelect: (files: File[], arrayHelpers: ArrayHelpers) => void;
    onClick?: () => void;
}
export declare type FormikFileInputProps<FieldName> = OwnProps<FieldName> & Omit<TextFieldProps, 'label'>;
declare function FormikFileInput<FieldName, ErrorType>({ name, legend, description, buttonLabel, accept, multiple, validate, onFilesSelect, error, onClick, }: FormikFileInputProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType>): JSX.Element;
export default FormikFileInput;
//# sourceMappingURL=FormikFileInput.d.ts.map