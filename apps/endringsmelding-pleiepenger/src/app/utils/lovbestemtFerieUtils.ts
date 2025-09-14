import { DateRange, getDateRangesFromDates, sortDateRange } from '@navikt/sif-common-utils';
import { FeriedagerMeta, LovbestemtFeriePeriode, LovbestemtFerieSøknadsdata } from '@types';

import { Feriedag, FeriedagMap } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { getFeriedagerIPeriode } from './ferieUtils';

export const getLovbestemtFerieSøknadsdataForPeriode = (
    ferieSøknad: LovbestemtFerieSøknadsdata,
    periode: DateRange,
): LovbestemtFerieSøknadsdata => {
    const feriedager: FeriedagMap = getFeriedagerIPeriode(ferieSøknad.feriedager, periode);
    return {
        feriedager,
        feriedagerMeta: getFeriedagerMeta(feriedager),
    };
};

const erFeriedag = (feriedag: Feriedag): boolean => {
    return feriedag.skalHaFerie === true;
};

const erFeriedagFjernet = (feriedag: Feriedag): boolean => {
    return feriedag.liggerISak && feriedag.skalHaFerie === false;
};

const erUendretFeriedag = (feriedag: Feriedag): boolean => {
    return feriedag.liggerISak && feriedag.skalHaFerie === true;
};

const erFeriedagLagtTil = (feriedag: Feriedag): boolean => {
    return feriedag.liggerISak === false && feriedag.skalHaFerie === true;
};

export const getFeriedagerMeta = (feriedager: FeriedagMap): FeriedagerMeta => {
    const alleDager: Feriedag[] = Object.keys(feriedager).map((key) => feriedager[key]);
    const datoerFjernet = alleDager.filter(erFeriedagFjernet).map((d) => d.dato);
    const datoerLagtTil = alleDager.filter(erFeriedagLagtTil).map((d) => d.dato);
    const datoerMedFerie = alleDager.filter(erFeriedag).map((d) => d.dato);
    const datoerUendret = alleDager.filter(erUendretFeriedag).map((d) => d.dato);
    const erEndret = datoerFjernet.length + datoerLagtTil.length > 0;

    const perioderFjernet = getDateRangesFromDates(datoerFjernet);
    const perioderLagtTil = getDateRangesFromDates(datoerLagtTil);
    const perioderUendret = getDateRangesFromDates(datoerUendret);

    const ferieperioderLagtTil = perioderLagtTil.map(
        (periode): LovbestemtFeriePeriode => ({
            ...periode,
            skalHaFerie: true,
            liggerISak: false,
        }),
    );
    const ferieperioderFjernet = perioderFjernet.map(
        (periode): LovbestemtFeriePeriode => ({
            ...periode,
            skalHaFerie: false,
            liggerISak: true,
        }),
    );
    const ferieperioderUendret = perioderUendret.map(
        (periode): LovbestemtFeriePeriode => ({
            ...periode,
            skalHaFerie: true,
            liggerISak: true,
        }),
    );

    return {
        datoerFjernet,
        datoerLagtTil,
        datoerMedFerie,
        datoerUendret,
        perioderFjernet: getDateRangesFromDates(datoerFjernet),
        perioderLagtTil: getDateRangesFromDates(datoerLagtTil),
        perioderUendret: getDateRangesFromDates(datoerUendret),
        ferieperioder: [...ferieperioderFjernet, ...ferieperioderLagtTil, ...ferieperioderUendret].sort(sortDateRange),
        erEndret,
    };
};
