import { DateRange, ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds';
import datepickerUtils from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds';
import {
    getDate1YearFromNow,
    getDate3YearsAgo,
    dateRangesCollide,
    dateRangesExceedsRange,
    dateRangeUtils,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { KursSøknadsdata } from '../../../types/søknadsdata/KursSøknadsdata';
import { AppFieldValidationErrors } from '../../../utils/fieldValidation';
import { KursFormValues } from './KursStep';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';

dayjs.extend(isoWeek);

export const getMaxDato = (fraDato?: string | Date): Date => {
    return fraDato ? dayjs(fraDato).endOf('day').add(1, 'year').toDate() : getDate1YearFromNow();
};

export const validateFraDato = (fraDatoString?: string, tilDatoString?: string): ValidationResult<ValidationError> => {
    const tilDato = datepickerUtils.getDateFromDateString(tilDatoString);

    return getDateRangeValidator({
        required: true,
        min: getDate3YearsAgo(),
        toDate: tilDato,
        onlyWeekdays: false,
    }).validateFromDate(fraDatoString);
};

export const validateTildato = (tilDatoString?: string, fraDatoString?: string): ValidationResult<ValidationError> => {
    return getDateRangeValidator({
        required: true,
        min: getDate3YearsAgo(),
        max: getMaxDato(fraDatoString),
        fromDate: datepickerUtils.getDateFromDateString(fraDatoString),
        onlyWeekdays: false,
    }).validateToDate(tilDatoString);
};

export const validateUtenlandsoppholdIPerioden = (
    periode: DateRange,
    utenlandsopphold: UtenlandsoppholdEnkel[],
): ValidationResult<ValidationError> => {
    if (utenlandsopphold.length === 0) {
        return AppFieldValidationErrors.utenlandsopphold_ikke_registrert;
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return AppFieldValidationErrors.utenlandsopphold_overlapper;
    }
    if (dateRangesExceedsRange(dateRanges, periode)) {
        return AppFieldValidationErrors.utenlandsopphold_utenfor_periode;
    }
    // TODO
    /*if (dateRangesHasFromDateEqualPreviousRangeToDate(dateRanges)) {
        return AppFieldValidationErrors.utenlandsopphold_overlapper_samme_start_slutt;
    }*/
    return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getKursSøknadsdataFromFormValues = ({
    kursholder,
    arbeiderIKursperiode,
    kursperioder,
}: KursFormValues): KursSøknadsdata | undefined => {
    if (!kursholder || !kursperioder || !kursholder || !arbeiderIKursperiode) {
        throw 'Kursholder eller kursperioder er ikke definert';
    }

    const søknadsperiode = dateRangeUtils.getDateRangeFromDateRanges(kursperioder.map((p) => p.periode));
    return {
        søknadsperiode,
        kursholder,
        kursperioder,
        arbeiderIKursperiode: arbeiderIKursperiode === YesOrNo.YES,
    };
};

export const getKursStepInitialValues = (søknadsdata: Søknadsdata, formValues?: KursFormValues): KursFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: KursFormValues = {};

    const { kurs } = søknadsdata;

    if (kurs) {
        return {
            ...defaultValues,
            kursholder: kurs.kursholder,
            kursperioder: kurs.kursperioder,
            arbeiderIKursperiode: getYesOrNoFromBoolean(kurs.arbeiderIKursperiode),
        };
    }

    return defaultValues;
};
