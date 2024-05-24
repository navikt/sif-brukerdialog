import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/src/forms/fravær/types';
import dayjs from 'dayjs';
import MinMax from 'dayjs/plugin/minMax';
import { FraværMap } from '../types/FraværTypes';
import { FraværSøknadsdataMap } from '../types/søknadsdata/FraværSøknadsdata';
import { getDate1YearAgo, getDateToday } from '@navikt/sif-common-utils';

dayjs.extend(MinMax);

export const getÅrstallFromFravær = (
    dagerMedDelvisFravær: FraværDag[],
    perioderMedFravær: FraværPeriode[],
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
            return dayjs.min(dager.map((d) => dayjs(d)))?.get('year');
    }
};
export const getTidsromFromÅrstall = (årstall?: number): DateRange => {
    if (årstall === undefined) {
        return { from: getDate1YearAgo(), to: dayjs().endOf('day').toDate() };
    }
    const førsteDagIÅret = dayjs(`${årstall}-01-01`).toDate();
    const sisteDagIÅret = dayjs(`${årstall}-12-31`).toDate();

    const minimumDate = dayjs.min([dayjs(sisteDagIÅret), dayjs(getDateToday())]);
    const toDate = minimumDate?.isValid() ? minimumDate.toDate() : sisteDagIÅret;

    return {
        from: førsteDagIÅret,
        to: toDate,
    };
};

export const getAlleFraværDager = (fravær: FraværMap): FraværDag[] => {
    const fraværliste = Object.values(fravær);
    const fraværDager: FraværDag[] = fraværliste
        .map((fravær) => {
            return fravær.fraværDager;
        })
        .flat();
    return fraværDager;
};

export const getAlleFraværDagerFromSøknadsdata = (fravær?: FraværSøknadsdataMap): FraværDag[] => {
    const fraværliste = fravær ? Object.values(fravær) : [];
    const fraværDager: FraværDag[] = fraværliste
        .map((fravær) => {
            return fravær.type !== 'harKunFulltFravær' ? fravær.fraværDager : [];
        })
        .flat();
    return fraværDager;
};

export const getAlleFraværPerioderFromSøknadsdata = (fravær?: FraværSøknadsdataMap): FraværPeriode[] => {
    const fraværliste = fravær ? Object.values(fravær) : [];
    const fraværPerioder: FraværPeriode[] = fraværliste
        .map((fravær) => {
            return fravær.type !== 'harKunDelvisFravær' ? fravær.fraværPerioder : [];
        })
        .flat();

    return fraværPerioder;
};

export const getAlleFraværPerioder = (fravær: FraværMap): FraværPeriode[] => {
    const fraværliste = Object.values(fravær);
    const fraværPerioder: FraværPeriode[] = fraværliste
        .map((fravær) => {
            return fravær.fraværPerioder;
        })
        .flat();

    return fraværPerioder;
};
