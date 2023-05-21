import { date1YearAgo, dateToday } from '@navikt/sif-common-utils';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/lib';
import dayjs, { Dayjs } from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { FraværSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { FraværFormValues } from './FraværStep';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/lib/utils/yesOrNoUtils';

dayjs.extend(minMax);

const getÅrstallFromFravær = (
    dagerMedDelvisFravær: FraværDag[],
    perioderMedFravær: FraværPeriode[]
): number | undefined => {
    const førsteDag = dagerMedDelvisFravær.length > 0 ? dagerMedDelvisFravær[0].dato : undefined;
    const førsteDagIPeriode = perioderMedFravær.length > 0 ? perioderMedFravær[0].fraOgMed : undefined;
    const dager: Date[] = [...(førsteDag ? [førsteDag] : []), ...(førsteDagIPeriode ? [førsteDagIPeriode] : [])];
    switch (dager.length) {
        case 0:
            return undefined;
        case 1:
            return dayjs(dager[0]).get('year');
        default:
            return dayjs.min(dager.map((d) => dayjs(d))).get('year');
    }
};

const getTidsromFromÅrstall = (årstall?: number): DateRange => {
    if (årstall === undefined) {
        return { from: date1YearAgo, to: dayjs().endOf('day').toDate() };
    }
    const førsteDagIÅret = dayjs(`${årstall}-01-01`).toDate();
    const sisteDagIÅret = dayjs(`${årstall}-12-31`).toDate();
    return {
        from: førsteDagIÅret,
        to: dayjs.min([dayjs(sisteDagIÅret), dayjs(dateToday)]).toDate(),
    };
};

const getPeriodeBoundaries = (
    perioderMedFravær: FraværPeriode[],
    dagerMedFravær: FraværDag[]
): { min?: Date; max?: Date } => {
    let min: Dayjs | undefined;
    let max: Dayjs | undefined;

    perioderMedFravær.forEach((p) => {
        min = min ? dayjs.min(dayjs(p.fraOgMed), min) : dayjs(p.fraOgMed);
        max = max ? dayjs.max(dayjs(p.tilOgMed), max) : dayjs(p.tilOgMed);
    });

    dagerMedFravær.forEach((d) => {
        min = min ? dayjs.min(dayjs(d.dato), min) : dayjs(d.dato);
        max = max ? dayjs.max(dayjs(d.dato), max) : dayjs(d.dato);
    });

    return {
        min: min !== undefined ? min.toDate() : undefined,
        max: max !== undefined ? max.toDate() : undefined,
    };
};

const fraværStepUtils = {
    getTidsromFromÅrstall,
    getÅrstallFromFravær,
    getPeriodeBoundaries,
};

export const getFraværStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: FraværFormValues
): FraværFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: FraværFormValues = {
        harPerioderMedFravær: YesOrNo.UNANSWERED,
        fraværPerioder: [],
        harDagerMedDelvisFravær: YesOrNo.UNANSWERED,
        fraværDager: [],
        perioder_harVærtIUtlandet: YesOrNo.UNANSWERED,
        perioder_utenlandsopphold: [],
    };

    const { fravaer } = søknadsdata;
    if (fravaer) {
        const perioder_harVærtIUtlandet = getYesOrNoFromBoolean(fravaer.perioder_harVærtIUtlandet);
        const perioder_utenlandsopphold =
            fravaer.perioder_harVærtIUtlandet === true ? fravaer.perioder_utenlandsopphold : [];
        switch (fravaer.type) {
            case 'harKunFulltFravær':
                return {
                    ...defaultValues,
                    harPerioderMedFravær: YesOrNo.YES,
                    fraværPerioder: fravaer.fraværPerioder,
                    harDagerMedDelvisFravær: YesOrNo.NO,
                    perioder_harVærtIUtlandet,
                    perioder_utenlandsopphold,
                };
            case 'harKunDelvisFravær':
                return {
                    ...defaultValues,
                    harPerioderMedFravær: YesOrNo.NO,
                    harDagerMedDelvisFravær: YesOrNo.YES,
                    fraværDager: fravaer.fraværDager,
                    perioder_harVærtIUtlandet,
                    perioder_utenlandsopphold,
                };
            case 'harFulltOgDelvisFravær':
                return {
                    ...defaultValues,
                    harPerioderMedFravær: YesOrNo.YES,
                    fraværPerioder: fravaer.fraværPerioder,
                    harDagerMedDelvisFravær: YesOrNo.YES,
                    fraværDager: fravaer.fraværDager,
                    perioder_harVærtIUtlandet,
                    perioder_utenlandsopphold,
                };
        }
    }
    return defaultValues;
};

export const getFraværSøknadsdataFromFormValues = (values: FraværFormValues): FraværSøknadsdata | undefined => {
    const { harPerioderMedFravær, fraværPerioder, harDagerMedDelvisFravær, fraværDager } = values;

    const perioder_harVærtIUtlandet = values.perioder_harVærtIUtlandet === YesOrNo.YES;
    const perioder_utenlandsopphold = perioder_harVærtIUtlandet === true ? values.perioder_utenlandsopphold : [];

    const harFulltFravær = harPerioderMedFravær === YesOrNo.YES && fraværPerioder.length > 0;
    const harDelvisFravær = harDagerMedDelvisFravær === YesOrNo.YES && fraværDager.length > 0;

    if (perioder_harVærtIUtlandet && perioder_utenlandsopphold.length === 0) {
        //TODO throw error eller amplitude
        return undefined;
    }

    if (harFulltFravær && !harDelvisFravær) {
        return {
            type: 'harKunFulltFravær',
            harPerioderMedFravær: true,
            fraværPerioder,
            harDagerMedDelvisFravær: false,
            perioder_harVærtIUtlandet,
            perioder_utenlandsopphold,
        };
    }

    if (harDelvisFravær && !harFulltFravær) {
        return {
            type: 'harKunDelvisFravær',
            harPerioderMedFravær: false,
            harDagerMedDelvisFravær: true,
            fraværDager,
            perioder_harVærtIUtlandet,
            perioder_utenlandsopphold,
        };
    }

    if (harDelvisFravær && !harFulltFravær) {
        return {
            type: 'harFulltOgDelvisFravær',
            harPerioderMedFravær: true,
            fraværPerioder,
            harDagerMedDelvisFravær: true,
            fraværDager,
            perioder_harVærtIUtlandet,
            perioder_utenlandsopphold,
        };
    }

    //TODO throw error eller amplitude
    return undefined;
};

export default fraværStepUtils;
