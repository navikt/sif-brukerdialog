import { getDateRangeValidator, getDateValidator, getStringValidator } from '@navikt/sif-validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';

export const validateFraDato = (
    fraDatoString?: string,
    tilDato?: Date,
    annenForelderSituasjon?: string,
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
    annenForelderSituasjon?: string,
): ValidationResult<ValidationError> => {
    const error = getDateRangeValidator({
        required: true,
        fromDate: fraDato,
    }).validateToDate(tilDatoString);
    return error ? `${error}.${annenForelderSituasjon}` : undefined;
};

export const validateTextArea = (value: string): ValidationResult<ValidationError> => {
    const error = getStringValidator({ required: true, minLength: 5, maxLength: 1000 })(value);
    return error
        ? {
              key: error,
              values: {
                  min: 5,
                  maks: 1000,
              },
          }
        : undefined;
};
