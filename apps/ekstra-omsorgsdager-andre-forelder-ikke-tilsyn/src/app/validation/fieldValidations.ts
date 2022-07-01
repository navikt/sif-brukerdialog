import { getDateRangeValidator, getDateValidator } from '@navikt/sif-common-formik/lib/validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik/lib/validation/types';

export const validateFradato = (
    fraDatoString?: string,
    tilDato?: Date,
    annenForelderSituasjon?: string
): ValidationResult<ValidationError> => {
    if (tilDato) {
        const error = getDateRangeValidator({
            required: true,
            toDate: tilDato,
        }).validateFromDate(fraDatoString);
        return error ? `${error}.${annenForelderSituasjon}` : undefined;
    }
    const error2 = getDateValidator({ required: true })(fraDatoString);
    return error2 ? `${error2}.${annenForelderSituasjon}` : undefined;
};

export const validateTildato = (
    tilDatoString?: string,
    fraDato?: Date,
    annenForelderSituasjon?: string
): ValidationResult<ValidationError> => {
    const error = getDateRangeValidator({
        required: true,
        fromDate: fraDato,
    }).validateToDate(tilDatoString);
    return error ? `${error}.${annenForelderSituasjon}` : undefined;
};
