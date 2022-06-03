import { FieldInputProps, FormikErrors, FormikProps } from 'formik';
import { TypedFormikFormContextType } from '../components/typed-formik-form/TypedFormikForm';
import { ErrorTypeChecker, FormError } from '../types';
export declare const getErrorPropForFormikInput: ({ error, field, form, context, }: {
    error: FormError;
    field: FieldInputProps<any>;
    form: FormikProps<any>;
    context?: TypedFormikFormContextType | undefined;
}) => FormError | undefined;
export declare const getErrorForField: <FormValues>(elementName: string, errors: FormikErrors<FormValues>) => any | undefined;
export declare const isValidationErrorsVisible: (formik: FormikProps<any>) => boolean;
export declare const getAllFieldsWithErrors: (allErrors: any, errorObjectChecker?: ErrorTypeChecker) => string[];
//# sourceMappingURL=typedFormErrorUtils.d.ts.map