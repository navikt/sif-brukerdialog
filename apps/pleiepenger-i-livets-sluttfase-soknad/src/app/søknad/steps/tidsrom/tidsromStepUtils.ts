import { DateRange, ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { Ferieuttak, Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import {
    date1YearFromNow,
    date3YearsAgo,
    dateRangesCollide,
    dateRangesExceedsRange,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { AppFieldValidationErrors } from '../../../utils/fieldValidation';
import { TidsromFormValues } from './TidsromStep';
import { TidsromSøknadsdata } from '../../../types/søknadsdata/TidsromSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { YesOrNoDontKnow } from '../../../types/YesOrNoDontKnow';

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

export const getTidsromSøknadsdataFromFormValues = (values: TidsromFormValues): TidsromSøknadsdata | undefined => {
    const {
        periodeFra,
        periodeTil,
        pleierDuDenSykeHjemme,
        flereSokere,
        skalOppholdeSegIUtlandetIPerioden,
        utenlandsoppholdIPerioden,
        skalTaUtFerieIPerioden,
        ferieuttakIPerioden,
    } = values;

    if (!periodeFra || !periodeTil) {
        throw Error('getTidsromSøknadsdataFromFormValues periodeFra eller periodeTil undefined');
    }

    const periodeFraDato = datepickerUtils.getDateFromDateString(periodeFra);
    const periodeTilDato = datepickerUtils.getDateFromDateString(periodeTil);

    if (!periodeFraDato || !periodeTilDato) {
        throw Error('getTidsromSøknadsdataFromFormValues periodeFraDato eller periodeTilDato undefined');
    }

    const søknadsperiode: DateRange = { from: periodeFraDato, to: periodeTilDato };

    if (pleierDuDenSykeHjemme === YesOrNo.NO) {
        throw Error('getTidsromSøknadsdataFromFormValues pleierDuDenSykeHjemme === YesOrNo.NO');
    }

    if (skalOppholdeSegIUtlandetIPerioden === YesOrNo.NO && skalTaUtFerieIPerioden === YesOrNo.NO) {
        return {
            type: 'tidsromUtenUtenlandsoppholdUtenFerie',
            søknadsperiode,
            flereSokere,
            skalOppholdeSegIUtlandetIPerioden: false,
            skalTaUtFerieIPerioden: false,
        };
    }

    if (skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && skalTaUtFerieIPerioden === YesOrNo.NO) {
        return {
            type: 'tidsromKunMedUtenlandsopphold',
            søknadsperiode,
            flereSokere,
            skalOppholdeSegIUtlandetIPerioden: true,
            utenlandsoppholdIPerioden,
            skalTaUtFerieIPerioden: false,
        };
    }

    if (skalOppholdeSegIUtlandetIPerioden === YesOrNo.NO && skalTaUtFerieIPerioden === YesOrNo.YES) {
        return {
            type: 'tidsromKunMedFerie',
            søknadsperiode,
            flereSokere,
            skalOppholdeSegIUtlandetIPerioden: false,
            skalTaUtFerieIPerioden: true,
            ferieuttakIPerioden,
        };
    }

    if (skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && skalTaUtFerieIPerioden === YesOrNo.YES) {
        return {
            type: 'tidsromMedUtenlandsoppholdMedFerie',
            søknadsperiode,
            flereSokere,
            skalOppholdeSegIUtlandetIPerioden: true,
            utenlandsoppholdIPerioden,
            skalTaUtFerieIPerioden: true,
            ferieuttakIPerioden,
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
        periodeFra: undefined,
        periodeTil: undefined,
        pleierDuDenSykeHjemme: YesOrNo.UNANSWERED,
        flereSokere: YesOrNoDontKnow.UNANSWERED,
        skalOppholdeSegIUtlandetIPerioden: YesOrNo.UNANSWERED,
        utenlandsoppholdIPerioden: [],
        skalTaUtFerieIPerioden: YesOrNo.UNANSWERED,
        ferieuttakIPerioden: [],
    };

    const { tidsrom } = søknadsdata;

    if (tidsrom) {
        const { from, to } = tidsrom.søknadsperiode;
        const periodeFra = datepickerUtils.getDateStringFromValue(from);
        const periodeTil = datepickerUtils.getDateStringFromValue(to);
        switch (tidsrom.type) {
            case 'tidsromUtenUtenlandsoppholdUtenFerie':
                return {
                    ...defaultValues,
                    periodeFra,
                    periodeTil,
                    pleierDuDenSykeHjemme: YesOrNo.YES,
                    flereSokere: tidsrom.flereSokere,
                    skalOppholdeSegIUtlandetIPerioden: YesOrNo.NO,
                    skalTaUtFerieIPerioden: YesOrNo.NO,
                };

            case 'tidsromKunMedUtenlandsopphold':
                return {
                    ...defaultValues,
                    periodeFra,
                    periodeTil,
                    pleierDuDenSykeHjemme: YesOrNo.YES,
                    flereSokere: tidsrom.flereSokere,
                    skalOppholdeSegIUtlandetIPerioden: YesOrNo.YES,
                    utenlandsoppholdIPerioden: tidsrom.utenlandsoppholdIPerioden,
                    skalTaUtFerieIPerioden: YesOrNo.NO,
                };

            case 'tidsromKunMedFerie':
                return {
                    ...defaultValues,
                    periodeFra,
                    periodeTil,
                    flereSokere: tidsrom.flereSokere,
                    skalOppholdeSegIUtlandetIPerioden: YesOrNo.NO,
                    skalTaUtFerieIPerioden: YesOrNo.YES,
                    ferieuttakIPerioden: tidsrom.ferieuttakIPerioden,
                };

            case 'tidsromMedUtenlandsoppholdMedFerie':
                return {
                    ...defaultValues,
                    periodeFra,
                    periodeTil,
                    pleierDuDenSykeHjemme: YesOrNo.YES,
                    flereSokere: tidsrom.flereSokere,
                    skalOppholdeSegIUtlandetIPerioden: YesOrNo.YES,
                    utenlandsoppholdIPerioden: tidsrom.utenlandsoppholdIPerioden,
                    skalTaUtFerieIPerioden: YesOrNo.YES,
                    ferieuttakIPerioden: tidsrom.ferieuttakIPerioden,
                };
        }
    }

    return defaultValues;
};
