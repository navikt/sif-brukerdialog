import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { getDateValidator } from '@navikt/sif-validation';

export const getPeriodeDatoValidator = (options: {
    periode: DateRange;
    registrertDato?: Date;
    kanSletteSluttdato?: boolean;
}) => {
    const { from: min, to: max } = options.periode;
    return (value) => {
        const error = getDateValidator({
            required: options.kanSletteSluttdato ? false : true,
            min,
            max,
            originalDate: options.registrertDato,
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
