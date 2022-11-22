import { Button } from '@navikt/ds-react';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { Back, Next } from '@navikt/ds-icons';
import { FieldInputProps, FormikProps, useFormikContext } from 'formik';
import { CancelButtonTypes, CustomFormErrorHandler, ErrorTypeChecker, FieldErrorHandler, FormError } from '../../types';
import { getErrorForField, isValidationErrorsVisible } from '../../utils/typedFormErrorUtils';
import FormikValidationErrorSummary from '../formik-validation-error-summary/FormikValidationErrorSummary';
import ButtonRow from '../helpers/button-row/ButtonRow';
import './typed-formik-form.scss';
export interface TypedFormikFormProps<FormValues, ErrorType> {
    children: React.ReactNode;
    className?: string;
    includeValidationSummary?: boolean;
    includeButtons?: boolean;
    resetFormOnCancel?: boolean;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    backButtonLabel?: string;
    id?: string;
    cancelButtonType?: CancelButtonTypes;
    runDelayedFormValidation?: boolean;
    formErrorHandler?: CustomFormErrorHandler<ErrorType>;
    formFooter?: React.ReactNode;
    errorSummaryTitle?: string;
    submitPending?: boolean;
    submitDisabled?: boolean;
    showButtonArrows?: boolean;
    noButtonsContentRenderer?: () => React.ReactNode;
    cleanup?: (values: FormValues) => FormValues;
    onValidSubmit?: () => void;
    onCancel?: () => void;
    onBack?: (values: FormValues) => void;
}

export type TypedFormikFormContextType = {
    showErrors: boolean;
    fieldErrorHandler?: FieldErrorHandler<any>;
    isHandledErrorTypeChecker?: ErrorTypeChecker<any>;
    getAndRenderFieldErrorMessage: (field: FieldInputProps<any>, form: FormikProps<any>) => FormError;
    onAfterFieldValueSet: () => void;
};

interface SubmitProps {
    isSubmitting: boolean;
    isValid: boolean;
}

const userHasSubmittedValidForm = (oldProps: SubmitProps, currentProps: SubmitProps) =>
    oldProps.isSubmitting === true && currentProps.isSubmitting === false && currentProps.isValid === true;

export const TypedFormikFormContext = createContext<TypedFormikFormContextType | undefined>(undefined);

function TypedFormikForm<FormValues, ErrorType>({
    children,
    resetFormOnCancel,
    className,
    includeValidationSummary,
    submitButtonLabel,
    cancelButtonLabel,
    backButtonLabel,
    id,
    includeButtons = true,
    runDelayedFormValidation,
    cancelButtonType,
    formErrorHandler,
    formFooter,
    errorSummaryTitle,
    submitPending,
    submitDisabled,
    showButtonArrows = true,
    onCancel,
    onBack,
    onValidSubmit,
    noButtonsContentRenderer,
    cleanup,
}: TypedFormikFormProps<FormValues, ErrorType>) {
    const formik = useFormikContext<FormValues>();
    const { handleSubmit, submitCount, setStatus, resetForm, isSubmitting, isValid } = formik;
    const [formSubmitCount, setFormSubmitCout] = useState(submitCount);

    const ref = useRef<any>({ isSubmitting, isValid });
    const summaryRef = useRef<HTMLDivElement>(null);

    const showErrors = formik?.status?.showErrors === true || formik?.initialStatus?.showErrors === true;

    useEffect(() => {
        ref.current = {
            isSubmitting,
            isValid,
        };
        if (!isSubmitting) {
            if (submitCount > formSubmitCount) {
                if (isValid) {
                    setFormSubmitCout(submitCount);
                } else {
                    setStatus({ showErrors: true });
                    if (summaryRef && summaryRef.current) {
                        summaryRef.current.focus();
                    }
                }
            } else {
                if (showErrors) {
                    setStatus({ showErrors: false });
                }
            }
        }
    }, [submitCount, showErrors, setStatus, formSubmitCount, isSubmitting, isValid]);

    if (userHasSubmittedValidForm(ref.current, { isValid, isSubmitting })) {
        if (onValidSubmit) {
            onValidSubmit();
        }
    }

    const runCleanup = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.stopPropagation();
        evt.preventDefault();
        formik.setValues(cleanup ? cleanup(formik.values) : formik.values);
    };

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        if (cleanup !== undefined) {
            runCleanup(evt);
            setTimeout(() => {
                handleSubmit(evt);
            });
        } else {
            handleSubmit(evt);
        }
    };

    const createTypedFormikFormContext = (): TypedFormikFormContextType => {
        const showErrors = isValidationErrorsVisible(formik);
        return {
            showErrors,
            fieldErrorHandler: (error, fieldName) => {
                return formErrorHandler ? formErrorHandler.fieldErrorHandler(error, fieldName) : error;
            },
            isHandledErrorTypeChecker: formErrorHandler?.isHandledErrorTypeFunc,
            getAndRenderFieldErrorMessage: (field, form) => {
                if (showErrors) {
                    const error = getErrorForField(field.name, form.errors);
                    if (error) {
                        return formErrorHandler ? formErrorHandler.fieldErrorHandler(error, field.name) : error;
                    }
                }
                return undefined;
            },
            onAfterFieldValueSet: () => {
                if (runDelayedFormValidation && formik.status && formik.status.showErrors) {
                    setTimeout(() => {
                        formik.validateForm();
                    });
                }
            },
        };
    };

    return (
        <form onSubmit={onSubmit} noValidate={true} className={className} id={id} autoComplete="off">
            <TypedFormikFormContext.Provider value={createTypedFormikFormContext()}>
                {children}
                {includeValidationSummary && !formik.isValid && isValidationErrorsVisible(formik) && (
                    <div style={{ marginTop: '2rem' }}>
                        <FormikValidationErrorSummary heading={errorSummaryTitle} summaryRef={summaryRef} />
                    </div>
                )}
                {includeButtons && (
                    <div style={{ marginTop: '2rem' }}>
                        <ButtonRow layout={'normal'}>
                            {onBack && (
                                <Button variant="secondary" type="button" onClick={() => onBack(formik.values)}>
                                    <span className="typedFormikForm__buttonLabel">
                                        {showButtonArrows && (
                                            <Back aria-hidden className="typedFormikForm__buttonLabel__icon" />
                                        )}
                                        {backButtonLabel || 'Forrige'}
                                    </span>
                                </Button>
                            )}

                            <Button
                                variant="primary"
                                type="submit"
                                loading={submitPending}
                                disabled={submitDisabled}
                                name="submit">
                                <span className="typedFormikForm__buttonLabel">
                                    {submitButtonLabel || 'Neste'}
                                    {showButtonArrows && (
                                        <Next aria-hidden className="typedFormikForm__buttonLabel__icon" />
                                    )}
                                </span>
                            </Button>

                            {onCancel && (
                                <Button
                                    type="button"
                                    variant={cancelButtonType || 'tertiary'}
                                    onClick={() => {
                                        if (resetFormOnCancel) {
                                            resetForm();
                                        }
                                        onCancel();
                                    }}>
                                    {cancelButtonLabel || 'Avbryt'}
                                </Button>
                            )}
                        </ButtonRow>
                    </div>
                )}
                {includeButtons === false && noButtonsContentRenderer && (
                    <div style={{ marginTop: '2rem' }}>{noButtonsContentRenderer()}</div>
                )}
                {formFooter && <div style={{ marginTop: '2rem' }}>{formFooter}</div>}
            </TypedFormikFormContext.Provider>
        </form>
    );
}

export default TypedFormikForm;
