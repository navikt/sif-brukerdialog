import { ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds';
import datepickerUtils from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { getDate1YearFromNow, getDate3YearsAgo, dateRangeUtils } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { INKLUDER_REISEDAGER_I_PERIODE, KursSøknadsdata } from '../../../types/søknadsdata/KursSøknadsdata';
import { KursFormValues } from './KursStep';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { Kursperiode } from '../../../types/Kursperiode';
import { Kursholder } from '../../../types/Kursholder';
import { getKursholderFromId } from '../../../utils/kursholderUtils';

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

export const getDatoerIKursperioderUtenReisedager = (perioder: Kursperiode[]) => {
    return dateRangeUtils.getDatesInDateRanges(perioder.map((p) => p.periode));
};

export const getDatoerIKursperioderInkludertReisedager = (perioder: Kursperiode[]) => {
    return dateRangeUtils.getDatesInDateRanges(perioder.map((p) => p.periodeMedReise));
};

const sortKursperiode = (a: Kursperiode, b: Kursperiode) => {
    return dayjs(a.periode.from).isBefore(dayjs(b.periode.from)) ? -1 : 1;
};

export const getKursholderById = (kursholdere: Kursholder[], id?: string): Kursholder | undefined => {
    return id ? kursholdere.find((k) => k.id === id) : undefined;
};

export const getKursSøknadsdataFromFormValues = (
    { kursholderId, arbeiderIKursperiode, kursperioder }: KursFormValues,
    kursholdere: Kursholder[],
): KursSøknadsdata | undefined => {
    if (!kursholderId || !kursperioder || !arbeiderIKursperiode) {
        throw 'Kursholder eller kursperioder er ikke definert';
    }

    const kursholder = kursholderId === 'annen' ? 'annen' : getKursholderFromId(kursholderId, kursholdere);
    if (!kursholder) {
        throw `Kursholder finnes ikke, ${kursholderId}`;
    }

    const søknadsperiodeUtenReisedager = dateRangeUtils.getDateRangeFromDateRanges(kursperioder.map((p) => p.periode));
    const søknadsperiodeMedReisedager = dateRangeUtils.getDateRangeFromDateRanges(
        kursperioder.map((p) => p.periodeMedReise),
    );

    return {
        søknadsperiode: INKLUDER_REISEDAGER_I_PERIODE ? søknadsperiodeMedReisedager : søknadsperiodeUtenReisedager,
        søknadsdatoer: INKLUDER_REISEDAGER_I_PERIODE
            ? getDatoerIKursperioderInkludertReisedager(kursperioder)
            : getDatoerIKursperioderUtenReisedager(kursperioder),
        kursholder,
        kursperioder: kursperioder.sort(sortKursperiode),
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
            kursholderId: kurs.kursholder === 'annen' ? 'annen' : kurs.kursholder.id,
            kursperioder: kurs.kursperioder,
            arbeiderIKursperiode: getYesOrNoFromBoolean(kurs.arbeiderIKursperiode),
        };
    }

    return defaultValues;
};
