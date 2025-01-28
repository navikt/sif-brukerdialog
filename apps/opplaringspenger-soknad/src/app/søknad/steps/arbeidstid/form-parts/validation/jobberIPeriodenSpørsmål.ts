import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ArbeidIPeriodeIntlValues } from '../../../../../types/ArbeidIPeriodeIntlValues';

export const getJobberIPeriodenValidator = (intlValues: ArbeidIPeriodeIntlValues) => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    console.log(intlValues);
    return error
        ? {
              key: 'validation.arbeidIPeriode.jobber',
              values: intlValues,
              keepKeyUnaltered: true,
          }
        : error;
};
