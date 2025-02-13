import { isDevMode } from '@navikt/sif-common-env';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getDateValidator,
    getFødselsnummerValidator,
    getStringValidator,
} from '@navikt/sif-validation';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';
import { UtenlandsoppholdUtvidet } from '@navikt/sif-common-forms-ds/src';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/types';
import {
    DateDurationMap,
    DateRange,
    dateRangesCollide,
    dateRangesExceedsRange,
    dateUtils,
    durationToDecimalDuration,
    getDate1YearFromNow,
    getDate3YearsAgo,
    getDurationsInDateRange,
    getValidDurations,
    summarizeDateDurationMap,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';
import { StønadGodtgjørelseFormValues } from '../types/søknad-form-values/StønadGodtgjørelseFormValues';
import { YesOrNoOrDoNotKnow } from '../types/YesOrNoOrDoNotKnow';

dayjs.extend(minMax);
dayjs.extend(isoWeek);

export enum AppFieldValidationErrors {
    'arbeidsforhold_timerUgyldig_under_1_prosent' = 'timerUgyldig_under_1_prosent',
    'arbeidsforhold_timerUgyldig_under_0_prosent' = 'timerUgyldig_under_0_prosent',
    'arbeidsforhold_timerUgyldig_over_99_prosent' = 'timerUgyldig_over_99_prosent',
    'arbeidsforhold_timerUgyldig_over_100_prosent' = 'timerUgyldig_over_100_prosent',

    'omsorgstilbud_gruppe_ingenInfo' = 'ingenInfo',
    'omsorgstilbud_gruppe_forMangeTimerTotalt' = 'forMangeTimerTotalt',

    'utenlandsopphold_ikke_registrert' = 'utenlandsopphold_ikke_registrert',
    'utenlandsopphold_overlapper' = 'utenlandsopphold_overlapper',
    'utenlandsopphold_overlapper_samme_start_slutt' = 'utenlandsopphold_overlapper_samme_start_slutt',
    'utenlandsopphold_utenfor_periode' = 'utenlandsopphold_utenfor_periode',
    'ferieuttak_ikke_registrert' = 'ferieuttak_ikke_registrert',
    'ferieuttak_overlapper' = 'ferieuttak_overlapper',
    'ferieuttak_utenfor_periode' = 'ferieuttak_utenfor_periode',
    'starter_slutter_undeveis_nei' = 'starter_slutter_undeveis_nei',
}

export const isYesOrNoAnswered = (answer?: YesOrNoOrDoNotKnow | YesOrNo) => {
    return (
        answer !== undefined &&
        (answer === YesOrNoOrDoNotKnow.NO ||
            answer === YesOrNoOrDoNotKnow.YES ||
            answer === YesOrNoOrDoNotKnow.DO_NOT_KNOW)
    );
};

export const validateNavn = (value: string): ValidationResult<ValidationError> => {
    const error = getStringValidator({ required: true, maxLength: 50 })(value);
    return error
        ? {
              key: error,
              values: { maks: 50 },
          }
        : undefined;
};

export const validateFødselsnummer = (value: string): ValidationResult<ValidationError> => {
    return getFødselsnummerValidator({ required: true, allowHnr: isDevMode() })(value);
};

export const validateFradato = (
    fraDatoString?: string,
    tilDatoString?: string,
    eldsteBarnFodselsdato?: Date,
): ValidationResult<ValidationError> => {
    const tilDato = datepickerUtils.getDateFromDateString(tilDatoString);
    const minDate = eldsteBarnFodselsdato
        ? dayjs.max(dayjs(getDate3YearsAgo()).endOf('day'), dayjs(eldsteBarnFodselsdato).endOf('day'))!.toDate()
        : getDate3YearsAgo();

    const error = getDateRangeValidator({
        required: true,
        min: minDate,
        toDate: tilDato,
        onlyWeekdays: false,
    }).validateFromDate(fraDatoString);
    return error
        ? {
              key:
                  error === 'dateIsBeforeMin' && !dayjs(getDate3YearsAgo()).isSame(minDate, 'day')
                      ? `${error}.${'fødselsdato'}`
                      : error,
          }
        : undefined;
};

export const getPeriodeMinDato = (fødselsdato?: Date) => {
    return fødselsdato
        ? dayjs.max(dayjs(getDate3YearsAgo()).endOf('day'), dayjs(fødselsdato).endOf('day'))!.toDate()
        : getDate3YearsAgo();
};

export const getPeriodeMaksDato = (fraDatoString?: string) => {
    if (fraDatoString && dayjs(fraDatoString).isValid()) {
        return dateUtils.getFirstOfTwoDates(
            dayjs(fraDatoString).endOf('day').add(1, 'year').toDate(),
            getDate1YearFromNow(),
        );
    }
    return getDate1YearFromNow();
};

export const validateTildato = (tilDatoString?: string, fraDatoString?: string): ValidationResult<ValidationError> => {
    return getDateRangeValidator({
        required: true,
        min: getPeriodeMinDato(),
        max: getPeriodeMaksDato(fraDatoString),
        fromDate: datepickerUtils.getDateFromDateString(fraDatoString),
        onlyWeekdays: false,
    }).validateToDate(tilDatoString);
};

export const validateUtenlandsoppholdIPerioden = (
    periode: DateRange,
    utenlandsopphold: UtenlandsoppholdUtvidet[],
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
    if (dateRangesCollide(dateRanges, false)) {
        return AppFieldValidationErrors.utenlandsopphold_overlapper_samme_start_slutt;
    }
    return undefined;
};

export const validateFerieuttakIPerioden = (
    periode: DateRange,
    ferieuttak: Ferieuttak[],
): ValidationResult<ValidationError> => {
    if (ferieuttak.length === 0) {
        return AppFieldValidationErrors.ferieuttak_ikke_registrert;
    }
    const dateRanges = ferieuttak.map((u) => ({ from: u.from, to: u.to }));
    if (dateRangesCollide(dateRanges)) {
        return AppFieldValidationErrors.ferieuttak_overlapper;
    }
    if (dateRangesExceedsRange(dateRanges, periode)) {
        return AppFieldValidationErrors.ferieuttak_utenfor_periode;
    }
    return undefined;
};

export const validateOmsorgstilbudEnkeltdagerIPeriode = (tidIOmsorgstilbud: DateDurationMap, periode: DateRange) => {
    const tidIPerioden = getDurationsInDateRange(tidIOmsorgstilbud, periode);
    const validTidEnkeltdager = getValidDurations(tidIPerioden);
    const hasElements = Object.keys(validTidEnkeltdager).length > 0;

    if (!hasElements || durationToDecimalDuration(summarizeDateDurationMap(validTidEnkeltdager)) <= 0) {
        return 'ingenTidRegistrert';
    }
    return undefined;
};

export const getstønadGodtgjørelseStartdatoValidator =
    (formValues: StønadGodtgjørelseFormValues, søknadsperiode: DateRange) =>
    (value: string): ValidationResult<ValidationError> => {
        const dateError = getDateValidator({ required: true, min: søknadsperiode.from, max: søknadsperiode.to })(value);
        if (dateError) {
            return dateError;
        }
        const startdato = datepickerUtils.getDateFromDateString(formValues.startdato);

        if (startdato && formValues.sluttdato && dayjs(startdato).isAfter(formValues.sluttdato, 'day')) {
            return 'startetEtterSluttDato';
        }
        return undefined;
    };

export const getstønadGodtgjørelseSluttdatoValidator =
    (formVaues: StønadGodtgjørelseFormValues, søknadsperiode: DateRange) =>
    (value: string): ValidationResult<ValidationError> => {
        const dateError = getDateValidator({ required: true, min: søknadsperiode.from, max: søknadsperiode.to })(value);
        if (dateError) {
            return dateError;
        }
        const sluttdato = datepickerUtils.getDateFromDateString(formVaues.sluttdato);

        if (sluttdato && formVaues.startdato && dayjs(sluttdato).isBefore(formVaues.startdato, 'day')) {
            return 'sluttetFørStartDato';
        }
        return undefined;
    };
