import { getTimeValidator } from '@navikt/sif-validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';
import { DurationWeekdays, summarizeDurationInDurationWeekdays, durationUtils } from '@navikt/sif-common-utils';

export const getOmsorgstilbudFastDagValidator = () =>
    getTimeValidator({ max: { hours: 7, minutes: 30 }, min: { hours: 0, minutes: 0 } });

export const validateOmsorgstilbudFasteDager = (
    fasteDager: DurationWeekdays | undefined,
): ValidationResult<ValidationError> => {
    let error;
    const timer = fasteDager ? summarizeDurationInDurationWeekdays(fasteDager) : 0;
    if (timer === 0) {
        error = 'ingenTidRegistrert';
    }
    if (timer !== 0 && durationUtils.durationToDecimalDuration(timer) > 37.5) {
        error = 'forMangeTimer';
    }
    return error;
};
