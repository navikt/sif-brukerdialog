import { IntlErrorObject } from '@navikt/sif-common-formik-ds';
import { getNumberValidator } from '@navikt/sif-validation';

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
