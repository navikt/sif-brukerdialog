import React, { ReactElement, RefObject } from 'react';
import { useFormikContext } from 'formik';
import ValidationSummary, { ValidationSummaryError } from '../helpers/ValidationSummary';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { getAllFieldsWithErrors, getErrorForField } from '../utils/typedFormErrorUtils';

interface Props {
    heading?: string;
    summaryRef?: RefObject<HTMLDivElement | null>;
    wrapper?: (errorSummary: ReactElement) => ReactElement;
}

const FormikValidationErrorSummary: React.FunctionComponent<Props> = ({ heading, summaryRef, wrapper }) => {
    const context = React.useContext(TypedFormikFormContext);
    const formik = useFormikContext();
    if (formik && context && context.showErrors) {
        const fieldsWithErrors =
            !formik.isValid && getAllFieldsWithErrors(formik.errors, context.isHandledErrorTypeChecker);
        const errors: ValidationSummaryError[] | undefined = fieldsWithErrors
            ? fieldsWithErrors.map((fieldName) => {
                  const fieldError = getErrorForField(fieldName, formik.errors);
                  const error: ValidationSummaryError = {
                      errorMessage: context.fieldErrorHandler
                          ? context.fieldErrorHandler(fieldError, fieldName)
                          : fieldError,
                      fieldName,
                  };
                  return error;
              })
            : undefined;

        if (errors) {
            if (wrapper) {
                return wrapper(<ValidationSummary errors={errors} />);
            }
            return <ValidationSummary heading={heading || 'Feil i skjema'} errors={errors} summaryRef={summaryRef} />;
        }
    }
    return null;
};

export default FormikValidationErrorSummary;
