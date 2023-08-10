import { getNumberValidator } from '@navikt/sif-common-formik/lib/validation';
import getTimeValidator from '@navikt/sif-common-formik/lib/validation/getTimeValidator';
import { IntlErrorObject } from '@navikt/sif-common-formik/lib/validation/types';
import {
    durationToDecimalDuration,
    DurationWeekdays,
    summarizeDurationInDurationWeekdays,
} from '@navikt/sif-common-utils/lib';

export const getArbeidstidFastProsentValidator =
    (minMax?: { min: number; max: number }) =>
    (value: any): IntlErrorObject | undefined => {
        const minMaxOptions = minMax || {
            min: 0,
            max: 100,
        };
        const error = getNumberValidator({ required: true, ...minMaxOptions })(value);
        return error
            ? {
                  key: error,
                  values: { ...minMaxOptions },
              }
            : undefined;
    };

export const validateFasteArbeidstimerIUke = (
    fasteDager: DurationWeekdays | undefined
): IntlErrorObject | undefined => {
    const timer = fasteDager ? durationToDecimalDuration(summarizeDurationInDurationWeekdays(fasteDager)) : 0;
    if (timer === 0) {
        return {
            key: `ingenTidRegistrert`,
        };
    }
    if (timer > 24 * 5) {
        return {
            key: `forMangeTimer`,
        };
    }
    return undefined;
};

export const getArbeidstimerFastDagValidator = () =>
    getTimeValidator({
        max: { hours: 24, minutes: 0 },
        min: { hours: 0, minutes: 0 },
    });
