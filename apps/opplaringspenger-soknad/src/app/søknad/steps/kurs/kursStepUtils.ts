import { ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import { getDateRangeValidator, getListValidator } from '@navikt/sif-validation';
import {
    getDate1YearFromNow,
    getDate3YearsAgo,
    dateRangeUtils,
    DateRange,
    isDateInDateRanges,
    getDatesInDateRange,
    dateFormatter,
    getDatesInDateRanges,
    sortDateRange,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { KursSøknadsdata, Opplæringsinstitusjon } from '../../../types/søknadsdata/KursSøknadsdata';
import { KursFormFields, KursFormValues } from './KursStep';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { Kursperiode } from '../../../types/Kursperiode';
import kursperiodeUtils from './kursperiodeUtils';
import { KursperiodeFormValues } from './kursperioder-form-part/KursperiodeQuestions';
import { FerieuttakIPeriodenSøknadsdata } from '../../../types/søknadsdata/FerieuttakIPeriodenSøknadsdata';
import { ReisedagerSøknadsdata } from '../../../types/søknadsdata/ReisedagerSøknadsdata';
import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';
import { Institusjon, Institusjoner } from '../../../api/institusjonService';

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

const getOpplæringsinstitusjon = (
    { annenInstitusjon, navnAnnenInstitusjon, valgtOpplæringsinstitusjon }: KursFormValues,
    institusjoner: Institusjon[],
): Opplæringsinstitusjon | undefined => {
    if (annenInstitusjon && navnAnnenInstitusjon) {
        return {
            navn: navnAnnenInstitusjon,
        };
    }
    if (valgtOpplæringsinstitusjon) {
        const opplæringsinstitusjon = institusjoner.find((i) => i.navn === valgtOpplæringsinstitusjon);
        if (opplæringsinstitusjon) {
            return {
                uuid: opplæringsinstitusjon.uuid,
                navn: opplæringsinstitusjon.navn,
            };
        }
    }
};

export const getKursSøknadsdataFromFormValues = (
    values: KursFormValues,
    institusjoner: Institusjoner,
): KursSøknadsdata | undefined => {
    const { kursperioder: kursperioderValues, ferieuttak, skalTaUtFerieIPerioden } = values;

    const opplæringsinstitusjon = getOpplæringsinstitusjon(values, institusjoner);

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
        opplæringsinstitusjon,
        kursperioder: kursperioder.sort(sortKursperiode),
        ferieuttakIPerioden: extractFerieuttakIPeriodenSøknadsdata({ skalTaUtFerieIPerioden, ferieuttak }),
    };
};

export const getKursStepInitialValues = (søknadsdata: Søknadsdata, formValues?: KursFormValues): KursFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: KursFormValues = {
        valgtOpplæringsinstitusjon: '',
        annenInstitusjon: false,
        navnAnnenInstitusjon: '',
        kursperioder: [{}],
    };

    const { kurs } = søknadsdata;

    if (kurs) {
        const values = {
            ...defaultValues,
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
        if ('uuid' in kurs.opplæringsinstitusjon) {
            values.valgtOpplæringsinstitusjon = kurs.opplæringsinstitusjon.navn;
        } else if (kurs.opplæringsinstitusjon.navn) {
            values.annenInstitusjon = true;
            values.navnAnnenInstitusjon = kurs.opplæringsinstitusjon.navn;
        }
        return values;
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
    const perioder = kursperioderValues
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
    return perioder.sort(sortDateRange);
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

export const getDatoerUtenforSøknadsperioder = (datoer: Date[], søknadsperioder: DateRange[]): Date[] => {
    return datoer.filter((reisedag) => !isDateInDateRanges(reisedag, søknadsperioder));
};

export const erAlleReisedagerInnenforSøknadsperioder = (
    reisedager: Enkeltdato[],
    søknadsperioder: DateRange[],
): boolean => {
    return reisedager.every((reisedag) => isDateInDateRanges(reisedag.dato, søknadsperioder));
};

export const getReisedagerValidator = (kursperioder: DateRange[]) => {
    return (reisedager: Enkeltdato[]) => {
        const error = getListValidator({ required: true })(reisedager);
        if (error) {
            return error;
        }
        /** Kontroller om datoer er innenfor søknadsperioder */
        const reisedagerUtenforSøknadsperioder = getDatoerUtenforSøknadsperioder(
            reisedager.map((d) => d.dato),
            kursperioder,
        );
        if (reisedagerUtenforSøknadsperioder.length > 0) {
            return {
                key: 'reisedagUtenforKursperiode',
                values: {
                    antallDager: reisedagerUtenforSøknadsperioder.length,
                    dager: reisedagerUtenforSøknadsperioder.map((d) => dateFormatter.dayCompactDate(d)).join(', '),
                },
            };
        }
        return undefined;
    };
};

export const erFerieInnenforSøknadsperioder = (ferieperioder: DateRange[], søknadsperioder: DateRange[]): boolean => {
    return ferieperioder.every((ferieperiode) => {
        const feriedager = getDatesInDateRange(ferieperiode);
        return feriedager.every((feriedag) => isDateInDateRanges(feriedag, søknadsperioder));
    });
};

export const getFerieperioderValidator = (kursperioder: DateRange[]) => {
    return (ferieperioder: DateRange[]) => {
        const listError = getListValidator({ required: true })(ferieperioder);
        if (listError) {
            return listError;
        }
        /** Kontroller om ferieperioder er innenfor søknadsperioder */
        const feriedager = getDatesInDateRanges(ferieperioder);
        const feriedagerUtenforSøknadsperioder = getDatoerUtenforSøknadsperioder(feriedager, kursperioder);
        if (feriedagerUtenforSøknadsperioder.length > 0) {
            return {
                key: 'ferieperiodeUtenforKursperiode',
                values: {
                    antallDager: feriedagerUtenforSøknadsperioder.length,
                    dager: feriedagerUtenforSøknadsperioder.map((d) => dateFormatter.dayCompactDate(d)).join(', '),
                },
            };
        }
        return undefined;
    };
};
