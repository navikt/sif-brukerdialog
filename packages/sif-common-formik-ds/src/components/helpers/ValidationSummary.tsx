import { ErrorSummary, ErrorSummaryProps } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import ValidationErrorLink from './ValidationErrorLink';

export interface Props extends Pick<ErrorSummaryProps, 'heading' | 'headingTag'> {
    errors: ValidationSummaryError[];
}

export interface ValidationSummaryError {
    errorMessage: string;
    fieldName: string;
}

const ValidationSummary: React.FunctionComponent<Props> = ({ errors, heading, headingTag }) => {
    const summaryEl = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const { current } = summaryEl;
        if (current !== null) {
            current.focus();
        }
    }, []);
    return (
        <ErrorSummary ref={summaryEl} heading={heading || 'Feil i skjema'} headingTag={headingTag}>
            {errors.map((error, idx) => (
                <ValidationErrorLink
                    key={`validation_error_key_${idx}`}
                    className={'lenke'}
                    onClick={() => {
                        const elementById = document.getElementById(error.fieldName);
                        const elementByName = document.getElementsByName(error.fieldName)[0];
                        if (elementById) {
                            elementById.focus();
                        } else if (elementByName) {
                            elementByName.focus();
                        }
                    }}>
                    {error.errorMessage}
                </ValidationErrorLink>
            ))}
        </ErrorSummary>
    );
};
export default ValidationSummary;
