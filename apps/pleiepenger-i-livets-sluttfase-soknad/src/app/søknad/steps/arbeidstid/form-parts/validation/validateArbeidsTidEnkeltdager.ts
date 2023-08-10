import { DateRange } from '@navikt/sif-common-formik/lib';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';
import { ArbeidIPeriodeIntlValues } from '@navikt/sif-common-pleiepenger/lib';
import {
    DateDurationMap,
    durationToDecimalDuration,
    getDurationsInDateRange,
    getValidDurations,
    summarizeDateDurationMap,
} from '@navikt/sif-common-utils/lib';

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
