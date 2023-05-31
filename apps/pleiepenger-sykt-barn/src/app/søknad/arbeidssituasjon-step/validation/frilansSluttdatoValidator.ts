import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { getDateValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib/validation/types';
import dayjs from 'dayjs';
import { FrilansFormData } from '../../../types/FrilansFormData';

export const getFrilanserSluttdatoValidator =
    (formData: FrilansFormData, søknadsperiode: DateRange, søknadsdato: Date) =>
    (value: string): ValidationResult<ValidationError> => {
        const dateError = getDateValidator({
            required: true,
            min: datepickerUtils.getDateFromDateString(formData.startdato),
            max: søknadsdato,
        })(value);
        if (dateError) {
            return dateError;
        }

        const frilansSluttdato = datepickerUtils.getDateFromDateString(formData.sluttdato);
        if (frilansSluttdato && dayjs(frilansSluttdato).isBefore(søknadsperiode.from, 'day')) {
            return 'sluttetFørSøknadsperiode';
        }

        return undefined;
    };
