import { ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds';
import datepickerUtils from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/datepickerUtils';
import { getDateRangeValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { getDate1YearFromNow, getDate3YearsAgo, dateRangeUtils, DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { INKLUDER_REISEDAGER_I_PERIODE, KursSøknadsdata } from '../../../types/søknadsdata/KursSøknadsdata';
import { KursFormValues } from './KursStep';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { Kursperiode } from '../../../types/Kursperiode';
import { Opplæringsinstitusjon } from '../../../types/Opplæringsinstitusjon';
import { getOpplæringsinstitusjonFromId } from '../../../utils/opplæringsinstitusjonUtils';

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

export const getOpplæringsinstitusjonById = (
    opplæringsinstitusjoner: Opplæringsinstitusjon[],
    id?: string,
): Opplæringsinstitusjon | undefined => {
    return id ? opplæringsinstitusjoner.find((k) => k.uuid === id) : undefined;
};

export const getKursSøknadsdataFromFormValues = (
    { opplæringsinstitusjonId, arbeiderIKursperiode, kursperioder }: KursFormValues,
    opplæringsinstitusjoner: Opplæringsinstitusjon[],
): KursSøknadsdata | undefined => {
    if (!opplæringsinstitusjonId || !kursperioder || !arbeiderIKursperiode) {
        throw 'Opplæringsinstitusjon eller kursperioder er ikke definert';
    }

    const opplæringsinstitusjon =
        opplæringsinstitusjonId === 'annen'
            ? 'annen'
            : getOpplæringsinstitusjonFromId(opplæringsinstitusjonId, opplæringsinstitusjoner);
    if (!opplæringsinstitusjon) {
        throw `Opplæringsinstitusjon finnes ikke, ${opplæringsinstitusjonId}`;
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
        opplæringsinstitusjon: opplæringsinstitusjon,
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
            opplæringsinstitusjonId: kurs.opplæringsinstitusjon === 'annen' ? 'annen' : kurs.opplæringsinstitusjon.uuid,
            kursperioder: kurs.kursperioder,
            arbeiderIKursperiode: getYesOrNoFromBoolean(kurs.arbeiderIKursperiode),
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

// export const ugyldigePerioderForInstitusjonOgOpphold = (
//     gyldigePerioder: DateRange[],
//     valgtePerioder: DateRange[],
// ): boolean => {
//     const ugyldigePerioder: DateRange[] = [];
//     // return dateRangeUtils.dateRangesCollide(gyldigePerioder);
//     return false;
// };
