import { DateRange } from '@navikt/sif-common-formik-ds';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import { getDateValidator } from '@navikt/sif-validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';
import { ISODate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

export const getFrilansStartdatoValidator =
    (startdato: ISODate | undefined, søknadsperiode: DateRange, max: Date, min: Date) =>
    (value: string): ValidationResult<ValidationError> => {
        const dateError = getDateValidator({ required: true, max, min })(value);
        if (dateError) {
            return dateError;
        }
        const frilansStartdato = datepickerUtils.getDateFromDateString(startdato);
        if (frilansStartdato && dayjs(frilansStartdato).isAfter(søknadsperiode.to, 'day')) {
            return 'startetEtterSøknadsperiode';
        }
        return undefined;
    };
