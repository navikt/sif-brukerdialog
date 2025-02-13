import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { ArbeidIPeriodeIntlValues } from '../../../../../types/ArbeidIPeriodeIntlValues';

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
