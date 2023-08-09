import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { getDateValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { ISODate } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

/** TODO: avklare hvilket tidsrom en faktisk kan oppgi her og i sluttdato - innenfor dagens dato, eller periode? */
export const getFrilanserStartdatoValidator =
    (startdato: ISODate | undefined, søknadsperiode: DateRange, søknadsdato: Date) =>
    (value: string): ValidationResult<ValidationError> => {
        const dateError = getDateValidator({ required: true, max: søknadsdato })(value);
        if (dateError) {
            return dateError;
        }
        const frilansStartdato = datepickerUtils.getDateFromDateString(startdato);
        if (frilansStartdato && dayjs(frilansStartdato).isAfter(søknadsperiode.to, 'day')) {
            return 'startetEtterSøknadsperiode';
        }
        return undefined;
    };
