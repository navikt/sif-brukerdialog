import { DateRange, ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import {
    date1YearFromNow,
    date3YearsAgo,
    dateRangesCollide,
    dateRangesExceedsRange,
    getDateRangeFromDates,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { TidsromSøknadsdata } from '../../../types/søknadsdata/TidsromSøknadsdata';
import { AppFieldValidationErrors } from '../../../utils/fieldValidation';
import { TidsromFormValues } from './TidsromStep';

dayjs.extend(isoWeek);

export const getMaxDato = (fraDato?: string | Date): Date => {
    return fraDato ? dayjs(fraDato).endOf('day').add(1, 'year').toDate() : date1YearFromNow;
};

export const søkerKunHelgedager = (fom?: string | Date, tom?: string | Date): boolean => {
    if (fom && tom) {
        const fomDayJs = dayjs(fom);
        const tomDayJs = dayjs(tom);

        if ((fomDayJs.isoWeekday() === 6 || fomDayJs.isoWeekday() === 7) && fomDayJs.isSame(tomDayJs, 'day')) {
            return true;
        } else if (fomDayJs.isoWeekday() === 6 && tomDayJs.isSame(fomDayJs.add(1, 'd'), 'day')) {
            return true;
        } else {
            return false;
        }
    }
    return false;
};

export const validateFraDato = (fraDatoString?: string, tilDatoString?: string): ValidationResult<ValidationError> => {
    const tilDato = datepickerUtils.getDateFromDateString(tilDatoString);

    return getDateRangeValidator({
        required: true,
        min: date3YearsAgo,
        toDate: tilDato,
        onlyWeekdays: false,
    }).validateFromDate(fraDatoString);
};

export const validateTildato = (tilDatoString?: string, fraDatoString?: string): ValidationResult<ValidationError> => {
    return getDateRangeValidator({
        required: true,
        min: date3YearsAgo,
        max: getMaxDato(fraDatoString),
        fromDate: datepickerUtils.getDateFromDateString(fraDatoString),
        onlyWeekdays: false,
    }).validateToDate(tilDatoString);
};

export const validateUtenlandsoppholdIPerioden = (
    periode: DateRange,
    utenlandsopphold: Utenlandsopphold[],
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

export const getTidsromSøknadsdataFromFormValues = (values: TidsromFormValues): TidsromSøknadsdata | undefined => {
    const { dagerMedPleie, skalJobbeIPerioden, skalOppholdeSegIUtlandetIPerioden, utenlandsoppholdIPerioden } = values;

    if (!dagerMedPleie || dagerMedPleie.length === 0) {
        throw Error('getTidsromSøknadsdataFromFormValues dagerMedPleie må inneholde datoer');
    }
    const søknadsperiode: DateRange = getDateRangeFromDates(dagerMedPleie);

    if (skalOppholdeSegIUtlandetIPerioden === YesOrNo.NO) {
        return {
            type: 'tidsromUtenUtenlandsopphold',
            søknadsperiode,
            dagerMedPleie,
            skalJobbeIPerioden: skalJobbeIPerioden === YesOrNo.YES,
            skalOppholdeSegIUtlandetIPerioden: false,
        };
    }

    if (skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES) {
        return {
            type: 'tidsromMedUtenlandsopphold',
            søknadsperiode,
            dagerMedPleie,
            skalJobbeIPerioden: skalJobbeIPerioden === YesOrNo.YES,
            skalOppholdeSegIUtlandetIPerioden: true,
            utenlandsoppholdIPerioden,
        };
    }

    return undefined;
};

export const getTidsromStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: TidsromFormValues,
): TidsromFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: TidsromFormValues = {
        dagerMedPleie: [],
        skalOppholdeSegIUtlandetIPerioden: YesOrNo.UNANSWERED,
        utenlandsoppholdIPerioden: [],
    };

    const { tidsrom } = søknadsdata;

    if (tidsrom) {
        const { dagerMedPleie } = tidsrom;
        const skalJobbeIPerioden: YesOrNo | undefined =
            tidsrom.skalJobbeIPerioden === undefined
                ? undefined
                : tidsrom.skalJobbeIPerioden === true
                ? YesOrNo.YES
                : YesOrNo.NO;

        switch (tidsrom.type) {
            case 'tidsromUtenUtenlandsopphold':
                return {
                    ...defaultValues,
                    dagerMedPleie,
                    skalJobbeIPerioden,
                    skalOppholdeSegIUtlandetIPerioden: YesOrNo.NO,
                };

            case 'tidsromMedUtenlandsopphold':
                return {
                    ...defaultValues,
                    dagerMedPleie,
                    skalJobbeIPerioden,
                    skalOppholdeSegIUtlandetIPerioden: YesOrNo.YES,
                    utenlandsoppholdIPerioden: tidsrom.utenlandsoppholdIPerioden,
                };
        }
    }

    return defaultValues;
};
