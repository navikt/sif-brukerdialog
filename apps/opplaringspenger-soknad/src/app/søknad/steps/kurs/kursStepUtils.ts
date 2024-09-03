import { ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds';
import datepickerUtils from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { getDate1YearFromNow, getDate3YearsAgo, dateRangeUtils } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { KursSøknadsdata } from '../../../types/søknadsdata/KursSøknadsdata';
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

export const getKursSøknadsdataFromFormValues = ({
    kursholder,
    arbeiderIKursperiode,
    kursperioder,
}: KursFormValues): KursSøknadsdata | undefined => {
    if (!kursholder || !kursperioder || !kursholder || !arbeiderIKursperiode) {
        throw 'Kursholder eller kursperioder er ikke definert';
    }

    const søknadsperiode = dateRangeUtils.getDateRangeFromDateRanges(kursperioder.map((p) => p.periode));
    const søknadsperiodeMedReisedager = dateRangeUtils.getDateRangeFromDateRanges(
        kursperioder.map((p) => p.periodeMedReise),
    );
    return {
        søknadsperiode,
        søknadsperiodeMedReisedager,
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
