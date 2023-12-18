import { IntlShape } from 'react-intl';
import { ValidationSummaryError } from '@navikt/sif-common-core-ds/src/components/validation-error-summary-base/ValidationErrorSummaryBase';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SoknadApiData } from '../types/SoknadApiData';

export const apiVedleggIsInvalid = (vedlegg: string[]): boolean => {
    vedlegg.find((v) => {
        return v === undefined;
    });
    return vedlegg.length === 0 || vedlegg.find((v) => v === undefined || v === '' || v === null) !== undefined;
};

export const validateApiValues = (values: SoknadApiData, intl: IntlShape): ValidationSummaryError[] | undefined => {
    const errors: ValidationSummaryError[] = [];

    if (apiVedleggIsInvalid(values.vedlegg)) {
        errors.push({
            name: 'vedlegg',
            message: intlHelper(intl, 'steg.oppsummering.validering.manglerVedlegg'),
        });
    }
    return errors.length > 0 ? errors : undefined;
};
