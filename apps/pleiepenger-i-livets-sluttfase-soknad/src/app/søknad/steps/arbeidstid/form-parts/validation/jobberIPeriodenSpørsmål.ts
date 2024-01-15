import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ArbeidIPeriodeIntlValues } from '../../../../../local-sif-common-pleiepenger';

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
