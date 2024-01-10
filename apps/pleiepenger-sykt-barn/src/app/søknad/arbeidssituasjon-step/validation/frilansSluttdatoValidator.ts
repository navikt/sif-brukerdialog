import { DateRange } from '@navikt/sif-common-formik-ds/src';
import datepickerUtils from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/datepickerUtils';
import { getDateValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/src/validation/types';
import dayjs from 'dayjs';

export const getFrilanserSluttdatoValidator =
    (søknadsperiode: DateRange, søknadsdato: Date, startdato?: string, sluttdato?: string) =>
    (value: string): ValidationResult<ValidationError> => {
        const dateError = getDateValidator({
            required: true,
            min: datepickerUtils.getDateFromDateString(startdato),
            max: søknadsdato,
        })(value);
        if (dateError) {
            return dateError;
        }

        const frilansSluttdato = datepickerUtils.getDateFromDateString(sluttdato);
        if (frilansSluttdato && dayjs(frilansSluttdato).isBefore(søknadsperiode.from, 'day')) {
            return 'sluttetFørSøknadsperiode';
        }

        return undefined;
    };
