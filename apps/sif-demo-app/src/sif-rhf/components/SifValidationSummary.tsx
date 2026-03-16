import { ErrorSummary } from '@navikt/ds-react';
import { RefObject } from 'react';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';

interface Props {
    heading?: string;
    summaryRef?: RefObject<HTMLDivElement | null>;
}

interface FlatError {
    fieldName: string;
    message: string;
}

const flattenErrors = (errors: FieldErrors, parentKey?: string): FlatError[] => {
    const result: FlatError[] = [];
    for (const key in errors) {
        const fieldKey = parentKey ? `${parentKey}.${key}` : key;
        const error = errors[key];
        if (error?.message && typeof error.message === 'string') {
            result.push({ fieldName: fieldKey, message: error.message });
        } else if (error && typeof error === 'object' && !error.message) {
            result.push(...flattenErrors(error as FieldErrors, fieldKey));
        }
    }
    return result;
};

const focusField = (fieldName: string) => {
    const el = document.getElementById(fieldName) || document.getElementsByName(fieldName)[0];
    if (el) {
        if (el.tagName === 'FIELDSET') {
            const focusable = el.querySelector<HTMLElement>('input, select, textarea');
            if (focusable) {
                focusable.focus();
                return;
            }
        }
        el.focus();
    }
};

export const SifValidationSummary = <T extends FieldValues>({ heading, summaryRef }: Props) => {
    const {
        formState: { errors, isSubmitted },
    } = useFormContext<T>();

    if (!isSubmitted) return null;

    const flatErrors = flattenErrors(errors);
    if (flatErrors.length === 0) return null;

    return (
        <ErrorSummary ref={summaryRef} heading={heading || 'Feil i skjema'}>
            {flatErrors.map((error, idx) => (
                <ErrorSummary.Item
                    key={`validation_error_${idx}`}
                    href="#"
                    onClick={(evt) => {
                        evt.preventDefault();
                        focusField(error.fieldName);
                    }}>
                    {error.message}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
};
