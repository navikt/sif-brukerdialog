import { ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds';
import datepickerUtils from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator } from '@navikt/sif-common-formik-ds/src/validation';
import {
    getDate1YearFromNow,
    getDate3YearsAgo,
    dateRangeUtils,
    DateRange,
    isDateInDateRanges,
    getDatesInDateRange,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { KursSøknadsdata } from '../../../types/søknadsdata/KursSøknadsdata';
import { KursFormFields, KursFormValues } from './KursStep';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { Kursperiode } from '../../../types/Kursperiode';
import kursperiodeUtils from './kursperiodeUtils';
import { KursperiodeFormValues } from './kursperioder-form-part/KursperiodeQuestions';
import { FerieuttakIPeriodenSøknadsdata } from '../../../types/søknadsdata/FerieuttakIPeriodenSøknadsdata';
import { ReisedagerSøknadsdata } from '../../../types/søknadsdata/ReisedagerSøknadsdata';

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

export const getDatoerIKursperioder = (perioder: Kursperiode[]) => {
    return dateRangeUtils.getDatesInDateRanges(perioder.map((p) => p.periode));
};

const sortKursperiode = (a: Kursperiode, b: Kursperiode) => {
    return dayjs(a.periode.from).isBefore(dayjs(b.periode.from)) ? -1 : 1;
};

export const getKursSøknadsdataFromFormValues = (values: KursFormValues): KursSøknadsdata | undefined => {
    const { opplæringsinstitusjon, kursperioder: kursperioderValues, ferieuttak, skalTaUtFerieIPerioden } = values;
    if (!opplæringsinstitusjon || !kursperioderValues) {
        throw 'Opplæringsinstitusjon eller kursperioder er ikke definert';
    }
    const kursperioder = kursperioderValues.map((periode, index) =>
        kursperiodeUtils.mapFormValuesToKursperiode(periode as KursperiodeFormValues, `${index}`),
    );

    return {
        søknadsperiode: dateRangeUtils.getDateRangeFromDateRanges(kursperioder.map((p) => p.periode)),
        søknadsdatoer: getDatoerIKursperioder(kursperioder),
        reisedager: extractReisedagerSøknadsdata(values),
        kursholder: opplæringsinstitusjon,
        kursperioder: kursperioder.sort(sortKursperiode),
        ferieuttakIPerioden: extractFerieuttakIPeriodenSøknadsdata({ skalTaUtFerieIPerioden, ferieuttak }),
    };
};

export const getKursStepInitialValues = (søknadsdata: Søknadsdata, formValues?: KursFormValues): KursFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: KursFormValues = {
        opplæringsinstitusjon: '',
        kursperioder: [{}],
    };

    const { kurs } = søknadsdata;

    if (kurs) {
        return {
            ...defaultValues,
            opplæringsinstitusjon: kurs.kursholder,
            kursperioder: kurs.kursperioder.map((periode) => kursperiodeUtils.mapKursperiodeToFormValues(periode)),
            skalTaUtFerieIPerioden: getYesOrNoFromBoolean(kurs.ferieuttakIPerioden?.skalTaUtFerieIPerioden),
            ...(kurs.reisedager.reiserUtenforKursdager === true
                ? {
                      reisedager: kurs.reisedager.reisedager,
                      reisedagerBeskrivelse: kurs.reisedager.reisedagerBeskrivelse,
                      reiserUtenforKursdager: YesOrNo.YES,
                  }
                : {
                      reiserUtenforKursdager: YesOrNo.NO,
                  }),
            ferieuttak:
                kurs.ferieuttakIPerioden?.type === 'skalTaUtFerieSøknadsdata'
                    ? kurs.ferieuttakIPerioden.ferieuttak
                    : undefined,
        };
    }

    return defaultValues;
};

export const getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig = (
    gyldigePerioder: DateRange[],
    gyldigSøknadsperiode: DateRange,
): DateRange[] => {
    /** Før og etterperioder brukes for å fange opp ugyldige perioder hvis gyldig perioder ikke dekker hele søkandsperioden */
    const periodeFørSøknadsperiode: DateRange = {
        from: dayjs(gyldigSøknadsperiode.from).subtract(2, 'day').toDate(),
        to: dayjs(gyldigSøknadsperiode.from).subtract(1, 'day').toDate(),
    };
    const periodeEtterSøknadsperiode: DateRange = {
        from: dayjs(gyldigSøknadsperiode.to).add(1, 'day').toDate(),
        to: dayjs(gyldigSøknadsperiode.to).add(2, 'day').toDate(),
    };
    return dateRangeUtils.getDateRangesBetweenDateRanges([
        periodeFørSøknadsperiode,
        ...gyldigePerioder,
        periodeEtterSøknadsperiode,
    ]);
};

export const extractFerieuttakIPeriodenSøknadsdata = ({
    skalTaUtFerieIPerioden,
    ferieuttak,
}: Partial<KursFormValues>): FerieuttakIPeriodenSøknadsdata | undefined => {
    if (skalTaUtFerieIPerioden && skalTaUtFerieIPerioden === YesOrNo.YES && ferieuttak) {
        return {
            type: 'skalTaUtFerieSøknadsdata',
            skalTaUtFerieIPerioden: true,
            ferieuttak: ferieuttak,
        };
    }

    if (skalTaUtFerieIPerioden && skalTaUtFerieIPerioden === YesOrNo.NO) {
        return {
            type: 'skalIkkeTaUtFerieSøknadsdata',
            skalTaUtFerieIPerioden: false,
        };
    }

    return undefined;
};

export const extractReisedagerSøknadsdata = (values: KursFormValues): ReisedagerSøknadsdata => {
    if (values.reiserUtenforKursdager === YesOrNo.YES) {
        const reisedagerBeskrivelse = values[KursFormFields.reisedagerBeskrivelse];
        const reisedager = values[KursFormFields.reisedager] || [];
        if (reisedager.length === 0) {
            throw 'Reisedager er ikke definert';
        }
        if (reisedagerBeskrivelse === undefined) {
            throw 'Reisedager er ikke definert';
        }
        return {
            reiserUtenforKursdager: true,
            reisedager: reisedager,
            reisedagerBeskrivelse,
        };
    }
    return {
        reiserUtenforKursdager: false,
    };
};

export const getDateRangesFromKursperiodeFormValues = (
    kursperioderValues?: Partial<KursperiodeFormValues>[],
): DateRange[] => {
    if (!kursperioderValues) {
        return [];
    }
    return kursperioderValues
        .map((periode, index) => {
            try {
                const kursperiode = kursperiodeUtils.mapFormValuesToKursperiode(
                    periode as KursperiodeFormValues,
                    `${index}`,
                );
                return kursperiode.periode;
            } catch {
                return undefined;
            }
        })
        .filter((p) => p && p.from && p.to) as DateRange[];
};

export const getSøknadsperiodeFromKursperioderFormValues = (
    kursperioderValues?: Partial<KursperiodeFormValues>[],
): DateRange | undefined => {
    const ranges = getDateRangesFromKursperiodeFormValues(kursperioderValues);
    if (ranges.length === 0) {
        return undefined;
    }
    if (ranges.length === 1) {
        return ranges[0];
    }
    return dateRangeUtils.getDateRangeFromDateRanges(getDateRangesFromKursperiodeFormValues(kursperioderValues));
};

export const erAlleReisedagerInnenforSøknadsperioder = (reisedager: Date[], søknadsperioder: DateRange[]): boolean => {
    return reisedager.every((reisedag) => isDateInDateRanges(reisedag, søknadsperioder));
};

export const erFerieInnenforSøknadsperioder = (ferieperioder: DateRange[], søknadsperioder: DateRange[]): boolean => {
    return ferieperioder.every((ferieperiode) => {
        const feriedager = getDatesInDateRange(ferieperiode);
        return feriedager.every((feriedag) => isDateInDateRanges(feriedag, søknadsperioder));
    });
};
