import dayjs from 'dayjs';
import { DateRange, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib';
import { FrilansFormData } from '../søknad/steps/arbeidssituasjon/form-parts/ArbeidssituasjonFrilans';
import { getDateValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';

export const getFrilanserSluttdatoValidator =
    (formData: FrilansFormData, søknadsperiode: DateRange, søknadsdato: Date, harFrilansoppdrag: boolean) =>
    (value: string): ValidationResult<ValidationError> => {
        const dateError = getDateValidator({
            required: true,
            min: datepickerUtils.getDateFromDateString(formData.startdato),
            max: søknadsdato,
        })(value);
        if (dateError) {
            return dateError;
        }
        /** Sjekk kun på om sluttdato er før søknadsperiode hvis bruker ikke har frilansoppdrag. */
        if (harFrilansoppdrag === false) {
            const frilansSluttdato = datepickerUtils.getDateFromDateString(formData.sluttdato);
            if (frilansSluttdato && dayjs(frilansSluttdato).isBefore(søknadsperiode.from, 'day')) {
                return 'sluttetFørSøknadsperiode';
            }
        }
        return undefined;
    };

export const getFrilanserStartdatoValidator =
    (formData: FrilansFormData, søknadsperiode: DateRange, søknadsdato: Date) =>
    (value: string): ValidationResult<ValidationError> => {
        const dateError = getDateValidator({ required: true, max: søknadsdato })(value);
        if (dateError) {
            return dateError;
        }
        const frilansStartdato = datepickerUtils.getDateFromDateString(formData.startdato);
        if (frilansStartdato && dayjs(frilansStartdato).isAfter(søknadsperiode.to, 'day')) {
            return 'startetEtterSøknadsperiode';
        }
        return undefined;
    };
