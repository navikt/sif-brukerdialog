import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { datepickerUtils, ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds';
import { Enkeltdato, Utenlandsopphold } from '@navikt/sif-common-forms-ds/src';
import {
    dateFormatter,
    DateRange,
    dateRangeUtils,
    getDate1YearFromNow,
    getDate3YearsAgo,
    getDatesInDateRange,
    getDatesInDateRanges,
    isDateInDateRanges,
    isDateWeekDay,
    ISODateToDate,
    sortDateRange,
} from '@navikt/sif-common-utils';
import { getDateRangeValidator, getListValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Kursperiode } from '../../../../types/Kursperiode';
import { FerieuttakIPeriodenSøknadsdata } from '../../../../types/søknadsdata/FerieuttakIPeriodenSøknadsdata';
import { KursSøknadsdata } from '../../../../types/søknadsdata/KursSøknadsdata';
import { ReisedagerSøknadsdata } from '../../../../types/søknadsdata/ReisedagerSøknadsdata';
import { Søknadsdata } from '../../../../types/søknadsdata/Søknadsdata';
import { UtenlandsoppholdIPeriodenSøknadsdata } from '../../../../types/søknadsdata/UtenlandsoppholdSøknadsdata';
import { KursperiodeFormValues } from '../parts/kursperioder-form-part/KursperiodeQuestions';
import kursperiodeOgDagUtils from './kursperiodeOgDagUtils';
import { KursFormFields, KursFormValues } from '../KursStep';

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
    const { opplæringsinstitusjon, kursperioder: kursperioderValues } = values;
    if (!opplæringsinstitusjon || !kursperioderValues) {
        throw 'Opplæringsinstitusjon eller kursperioder er ikke definert';
    }
    const kursperioder = kursperioderValues.map((periode, index) =>
        kursperiodeOgDagUtils.mapFormValuesToKursperiode(periode as KursperiodeFormValues, `${index}`),
    );

    return {
        søknadsperiode: dateRangeUtils.getDateRangeFromDateRanges(kursperioder.map((p) => p.periode)),
        søknadsdatoer: getDatoerIKursperioder(kursperioder),
        reisedager: extractReisedagerSøknadsdata(values),
        kursholder: opplæringsinstitusjon,
        kursperioder: kursperioder.sort(sortKursperiode),
        ferieuttakIPerioden: extractFerieuttakIPeriodenSøknadsdata(values),
        utenlandsopphold: extractUtenlandsoppholdIPeriodenSøknadsdata(values),
    };
};

export const getKursStepInitialValues = (søknadsdata: Søknadsdata, formValues?: KursFormValues): KursFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: KursFormValues = {
        opplæringsinstitusjon: '',
        kursperioder: [{}],
        kursdager: [{}],
    };

    const { kurs } = søknadsdata;

    if (kurs) {
        return {
            ...defaultValues,
            opplæringsinstitusjon: kurs.kursholder,
            kursperioder: kurs.kursperioder.map((periode) => kursperiodeOgDagUtils.mapKursperiodeToFormValues(periode)),
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
            skalOppholdeSegIUtlandetIPerioden: getYesOrNoFromBoolean(
                kurs.utenlandsopphold?.skalOppholdeSegIUtlandetIPerioden,
            ),
            utenlandsoppholdIPerioden:
                kurs.utenlandsopphold?.type === 'harUtenlandsopphold'
                    ? kurs.utenlandsopphold.utenlandsopphold
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
export const extractUtenlandsoppholdIPeriodenSøknadsdata = ({
    skalOppholdeSegIUtlandetIPerioden,
    utenlandsoppholdIPerioden,
}: Partial<KursFormValues>): UtenlandsoppholdIPeriodenSøknadsdata | undefined => {
    if (
        skalOppholdeSegIUtlandetIPerioden &&
        skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES &&
        utenlandsoppholdIPerioden
    ) {
        return {
            type: 'harUtenlandsopphold',
            skalOppholdeSegIUtlandetIPerioden: true,
            utenlandsopphold: utenlandsoppholdIPerioden,
        };
    }

    if (skalOppholdeSegIUtlandetIPerioden && skalOppholdeSegIUtlandetIPerioden === YesOrNo.NO) {
        return {
            type: 'harIkkeUtenlandsopphold',
            skalOppholdeSegIUtlandetIPerioden: false,
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
    kursperioderValues?: Array<Partial<KursperiodeFormValues>>,
): DateRange[] => {
    if (!kursperioderValues) {
        return [];
    }
    const perioder = kursperioderValues
        .map((periode, index) => {
            try {
                const kursperiode = kursperiodeOgDagUtils.mapFormValuesToKursperiode(
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
    kursperioderValues?: Array<Partial<KursperiodeFormValues>>,
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

export const getDatoerSomErHelg = (datoer: Date[]): Date[] => {
    return datoer.filter((reisedag) => isDateWeekDay(reisedag) === false);
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
        /** Kontroller om datoer er på en helgedag */
        const reisedagerPåHelg = getDatoerSomErHelg(reisedager.map((d) => d.dato));
        if (reisedagerPåHelg.length > 0) {
            return {
                key: 'reisedagPåHelg',
                values: {
                    antallDager: reisedagerPåHelg.length,
                    dager: reisedagerPåHelg.map((d) => dateFormatter.dayCompactDate(d)).join(', '),
                },
            };
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
export const getUtenlandsoppholdValidator = (kursperioder: DateRange[]) => {
    return (utenlandsopphold: Utenlandsopphold[]) => {
        const listError = getListValidator({ required: true })(utenlandsopphold);
        if (listError) {
            return listError;
        }
        /** Kontroller om utenlandsopphold er innenfor søknadsperioder */
        const dager = getDatesInDateRanges(utenlandsopphold.map((u): DateRange => ({ from: u.fom, to: u.tom })));
        const dagerUtenforSøknadsperioder = getDatoerUtenforSøknadsperioder(dager, kursperioder);
        if (dagerUtenforSøknadsperioder.length > 0) {
            return {
                key: 'utenlandsoppholdUtenforKursperiode',
                values: {
                    antallDager: dagerUtenforSøknadsperioder.length,
                    dager: dagerUtenforSøknadsperioder.map((d) => dateFormatter.dayCompactDate(d)).join(', '),
                },
            };
        }
        return undefined;
    };
};

export const startOgSluttErSammeHelg = (start?: Date, slutt?: Date): boolean => {
    if (!start || !slutt) return false;

    const startErHelgedag = !isDateWeekDay(start);
    const sluttErHelgedag = !isDateWeekDay(slutt);
    const dagerMellom = Math.abs(dayjs(slutt).diff(dayjs(start), 'day'));

    return startErHelgedag && sluttErHelgedag && (dagerMellom === 0 || dagerMellom === 1);
};

export const getKursperioderValidator = (perioder: KursperiodeFormValues[]) => {
    const ranges = perioder
        .map((periode) => {
            const from = ISODateToDate(periode.fom);
            const to = ISODateToDate(periode.tom);
            return from && to ? { from, to } : undefined;
        })
        .filter((range) => dateRangeUtils.isDateRange(range));
    if (!ranges || ranges.length === 0) {
        return undefined;
    }
    /** Perioder overlapper */
    if (dateRangeUtils.dateRangesCollide(ranges)) {
        return 'kursperioderOverlapper';
    }
    return undefined;
};
