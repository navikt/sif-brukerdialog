import { ErrorSummaryProps } from '@navikt/ds-react';
import React from 'react';
export interface Props extends Pick<ErrorSummaryProps, 'heading' | 'headingTag'> {
    errors: ValidationSummaryError[];
}
export interface ValidationSummaryError {
    errorMessage: string;
    fieldName: string;
}
declare const ValidationSummary: React.FunctionComponent<Props>;
export default ValidationSummary;
//# sourceMappingURL=ValidationSummary.d.ts.map