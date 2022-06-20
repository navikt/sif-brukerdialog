import { DateRange, prettifyDate } from '@navikt/sif-common-core/lib/utils/dateUtils';
import {
    ValidateDateError,
    ValidateDateRangeError,
    ValidateRequiredFieldError,
} from '@navikt/sif-common-formik-ds/lib/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { DateTidsperiode } from '../tidsperiode';

export const mapFomTomToDateRange = ({ fom, tom }: DateTidsperiode): DateRange => ({
    from: fom,
    to: tom,
});

export const handleDateRangeValidationError = (
    error: ValidateDateError | ValidateDateRangeError | ValidateRequiredFieldError | undefined,
    minDate: Date | undefined,
    maxDate: Date | undefined
): ValidationError | undefined => {
    if (minDate && error === ValidateDateError.dateIsBeforeMin) {
        return {
            key: error,
            values: { dato: prettifyDate(minDate) },
        };
    }
    if (maxDate && error === ValidateDateError.dateIsAfterMax) {
        return {
            key: error,
            values: { dato: prettifyDate(maxDate) },
        };
    }
    return error;
};
