import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateToISOString } from '@navikt/sif-common-formik-ds';
import { dateErHelg } from '@navikt/sif-common-forms-ds/src/forms/fravær/fraværUtilities';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/src/forms/fravær/types';
import dayjs from 'dayjs';
import { flatten, uniqBy } from 'lodash';
import { FraværFraSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { FraværFraFormValues } from './FraværFraStep';

export const sortByDate = (d1: Date, d2: Date): number => (dayjs(d1).isAfter(d2, 'day') ? 1 : -1);

export const getDatesWithinDateRange = ({ from, to }: DateRange): Date[] => {
    const dates: Date[] = [];
    let currentDate: Date = from;
    if (dayjs(from).isAfter(to)) {
        throw new Error('From date cannot be after to date');
    }
    while (dayjs(currentDate).isSameOrBefore(to)) {
        dates.push(currentDate);
        currentDate = dayjs(currentDate).add(1, 'day').toDate();
    }
    return dates;
};

export const getUtbetalingsdatoerFraFravær = (perioder: FraværPeriode[], dager: FraværDag[]): Date[] => {
    const datoerIPeriode = perioder.map((p) => getDatesWithinDateRange({ from: p.fraOgMed, to: p.tilOgMed }));

    const datoer: Date[] = uniqBy([...flatten(datoerIPeriode), ...dager.map((d) => d.dato)], (d) => {
        return dateToISOString(d);
    });

    return datoer.filter((d) => dateErHelg(d) === false).sort(sortByDate);
};

export const getFraværFraStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: FraværFraFormValues,
): FraværFraFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: FraværFraFormValues = {
        aktivitetFravær: {},
    };

    const { fravaerFra } = søknadsdata;

    if (!fravaerFra) {
        return defaultValues;
    }

    if (fravaerFra.type === 'harFraværFra') {
        return { aktivitetFravær: fravaerFra.aktivitetFravær };
    }
    return defaultValues;
};

export const getFraværFraSøknadsdataFromFormValues = (
    values: FraværFraFormValues,
): FraværFraSøknadsdata | undefined => {
    const { aktivitetFravær } = values;

    return { type: 'harFraværFra', aktivitetFravær };
};
