import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { getDateValidator } from '@navikt/sif-validation';

export const getStartdatoValidator = ({ from: min, to: max }: DateRange) => {
    return (value) => {
        const error = getDateValidator({
            required: true,
            min,
            max,
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

export const getSluttdatoValidator = ({ from: min, to: max }: DateRange) => {
    return (value) => {
        const error = getDateValidator({
            required: true,
            min,
            max,
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
