import { DateRange, getDateRangesFromDates } from '@navikt/sif-common-utils/lib';
import { Feriedag, FeriedagMap } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { FeriedagerMeta, LovbestemtFerieSøknadsdata } from '../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { getFeriedagerIPeriode } from './ferieUtils';

export const harFjernetLovbestemtFerie = (ferieSøknad: LovbestemtFerieSøknadsdata | undefined): boolean => {
    if (!ferieSøknad) {
        return false;
    }
    return ferieSøknad.feriedagerMeta.datoerFjernet.length > 0;
};

export const getLovbestemtFerieForPeriode = (
    ferieSøknad: LovbestemtFerieSøknadsdata,
    periode: DateRange
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

const erFeriedagLagtTil = (feriedag: Feriedag): boolean => {
    return feriedag.liggerISak === false && feriedag.skalHaFerie === true;
};

export const getFeriedagerMeta = (feriedager: FeriedagMap): FeriedagerMeta => {
    const alleDager: Feriedag[] = Object.keys(feriedager).map((key) => feriedager[key]);
    const datoerFjernet = alleDager.filter(erFeriedagFjernet).map((d) => d.dato);
    const datoerLagtTil = alleDager.filter(erFeriedagLagtTil).map((d) => d.dato);
    const datoerMedFerie = alleDager.filter(erFeriedag).map((d) => d.dato);
    const erEndret = datoerFjernet.length + datoerLagtTil.length > 0;

    return {
        alleDager,
        datoerFjernet,
        datoerLagtTil,
        datoerMedFerie,
        perioderFjernet: getDateRangesFromDates(datoerFjernet),
        perioderLagtTil: getDateRangesFromDates(datoerLagtTil),
        perioderMedFerie: getDateRangesFromDates(datoerMedFerie),
        erEndret,
    };
};
