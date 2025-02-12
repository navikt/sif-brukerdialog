import { DateRange, prettifyDate } from '@navikt/sif-common-utils';
import { ValidateDateError, ValidateDateRangeError, ValidateRequiredFieldError } from '@navikt/sif-common-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { DateTidsperiode } from '../forms/tidsperiode';

export const mapFomTomToDateRange = ({ fom, tom }: DateTidsperiode): DateRange => ({
    from: fom,
    to: tom,
});

export const handleDateRangeValidationError = (
    error: ValidateDateError | ValidateDateRangeError | ValidateRequiredFieldError | undefined,
    minDate: Date | undefined,
    maxDate: Date | undefined,
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
