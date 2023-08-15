import {
    DateDurationMap,
    DateRange,
    durationToDecimalDuration,
    getDurationsInDateRange,
    getValidDurations,
    summarizeDateDurationMap,
} from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeIntlValues } from '../../../../../local-sif-common-pleiepenger';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib';

export const validateArbeidsTidEnkeltdager = (
    tidMedArbeid: DateDurationMap,
    periode: DateRange,
    intlValues: ArbeidIPeriodeIntlValues
): ValidationResult<ValidationError> => {
    const tidIPerioden = getDurationsInDateRange(tidMedArbeid, periode);
    const validTidEnkeltdager = getValidDurations(tidIPerioden);
    const hasElements = Object.keys(validTidEnkeltdager).length > 0;

    if (!hasElements || durationToDecimalDuration(summarizeDateDurationMap(validTidEnkeltdager)) <= 0) {
        return {
            key: `validation.arbeidIPeriode.enkeltdager.ingenTidRegistrert`,
            keepKeyUnaltered: true,
            values: intlValues,
        };
    }
    return undefined;
};
