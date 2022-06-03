import React from 'react';
import { FieldInputProps, FormikProps } from 'formik';
import { CancelButtonTypes, CustomFormErrorHandler, ErrorTypeChecker, FieldErrorHandler, FormError } from '../../types';
export interface TypedFormikFormProps<FormValues, ErrorType> {
    children: React.ReactNode;
    className?: string;
    includeValidationSummary?: boolean;
    includeButtons?: boolean;
    resetFormOnCancel?: boolean;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    id?: string;
    cancelButtonType?: CancelButtonTypes;
    runDelayedFormValidation?: boolean;
    formErrorHandler?: CustomFormErrorHandler<ErrorType>;
    formFooter?: React.ReactNode;
    errorSummaryTitle?: string;
    noButtonsContentRenderer?: () => React.ReactNode;
    cleanup?: (values: FormValues) => FormValues;
    onValidSubmit?: () => void;
    onCancel?: () => void;
}
export declare type TypedFormikFormContextType = {
    showErrors: boolean;
    fieldErrorHandler?: FieldErrorHandler<any>;
    isHandledErrorTypeChecker?: ErrorTypeChecker<any>;
    getAndRenderFieldErrorMessage: (field: FieldInputProps<any>, form: FormikProps<any>) => FormError;
    onAfterFieldValueSet: () => void;
};
export declare const TypedFormikFormContext: React.Context<TypedFormikFormContextType | undefined>;
declare function TypedFormikForm<FormValues, ErrorType>({ children, resetFormOnCancel, className, includeValidationSummary, submitButtonLabel, cancelButtonLabel, id, includeButtons, runDelayedFormValidation, cancelButtonType, formErrorHandler, formFooter, errorSummaryTitle, onCancel, onValidSubmit, noButtonsContentRenderer, cleanup, }: TypedFormikFormProps<FormValues, ErrorType>): JSX.Element;
export default TypedFormikForm;
//# sourceMappingURL=TypedFormikForm.d.ts.map