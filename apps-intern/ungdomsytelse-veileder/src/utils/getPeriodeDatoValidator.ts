import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { getDateValidator } from '@navikt/sif-validation';

export const getPeriodeDatoValidator = ({ from: min, to: max }: DateRange, registrertDato?: Date) => {
    return (value) => {
        const error = getDateValidator({
            required: true,
            min,
            max,
            originalDate: registrertDato,
            onlyWeekdays: true,
        })(value);
        return error
            ? {
                  key: error,
                  values: {
                      min: dateFormatter.compact(min),
                      max: dateFormatter.compact(max),
                  },
              }
            : undefined;
    };
};
