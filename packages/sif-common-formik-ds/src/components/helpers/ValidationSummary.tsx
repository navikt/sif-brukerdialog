import { ErrorSummary, ErrorSummaryProps } from '@navikt/ds-react';
import React, { RefObject } from 'react';

export interface Props extends Pick<ErrorSummaryProps, 'heading' | 'headingTag'> {
    errors: ValidationSummaryError[];
    summaryRef?: RefObject<HTMLDivElement>;
}

export interface ValidationSummaryError {
    errorMessage: string;
    fieldName: string;
}

const ValidationSummary: React.FunctionComponent<Props> = ({ errors, heading, headingTag, summaryRef }) => {
    return (
        <ErrorSummary ref={summaryRef} heading={heading || 'Feil i skjema'} headingTag={headingTag}>
            {errors.map((error, idx) => (
                <ErrorSummary.Item
                    key={`validation_error_key_${idx}`}
                    className={'lenke'}
                    href="#"
                    style={{ cursor: 'hand' }}
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
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
};
export default ValidationSummary;
