import { getRequiredFieldValidator } from '@navikt/sif-common-formik/lib/validation';
import { ArbeidIPeriodeIntlValues } from '@navikt/sif-common-pleiepenger/lib';

export const getJobberIPeriodenValidator = (intlValues: ArbeidIPeriodeIntlValues) => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    return error
        ? {
              key: 'validation.arbeidIPeriode.jobber',
              values: intlValues,
              keepKeyUnaltered: true,
          }
        : error;
};
