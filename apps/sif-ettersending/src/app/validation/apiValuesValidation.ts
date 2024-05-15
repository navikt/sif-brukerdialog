import { ValidationSummaryError } from '@navikt/sif-common-core-ds/src/components/validation-error-summary-base/ValidationErrorSummaryBase';
import { SoknadApiData } from '../types/SoknadApiData';
import { AppIntlShape } from '../i18n';

export const apiVedleggIsInvalid = (vedlegg: string[]): boolean => {
    vedlegg.find((v) => {
        return v === undefined;
    });
    return vedlegg.length === 0 || vedlegg.find((v) => v === undefined || v === '' || v === null) !== undefined;
};

export const validateApiValues = (
    values: SoknadApiData,
    { text }: AppIntlShape,
): ValidationSummaryError[] | undefined => {
    const errors: ValidationSummaryError[] = [];

    if (apiVedleggIsInvalid(values.vedlegg)) {
        errors.push({
            name: 'vedlegg',
            message: text('steg.oppsummering.validering.manglerVedlegg'),
        });
    }
    return errors.length > 0 ? errors : undefined;
};
