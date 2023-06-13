import { FraværDag, FraværPeriode, FraværÅrsak } from '@navikt/sif-common-forms-ds/lib';
import dayjs from 'dayjs';
import fraværStepUtils from '../søknad/steps/fravær/FraværStepUtils';

// Dette vil slettes i januar 2024

export const brukEndringeneFor2023 = (fraværDager: FraværDag[], fraværPerioder: FraværPeriode[]) => {
    const årstallFromFravær = fraværStepUtils.getÅrstallFromFravær(fraværDager, fraværPerioder);
    return dayjs().year() > 2022 && årstallFromFravær && årstallFromFravær > 2022;
};

export const harFraværPgaSmittevernhensyn = (perioder: FraværPeriode[], dager: FraværDag[]): boolean => {
    return [...perioder, ...dager].findIndex(({ årsak }) => årsak === FraværÅrsak.smittevernhensyn) >= 0;
};

export const harFraværPgaStengBhgSkole = (perioder: FraværPeriode[], dager: FraværDag[]): boolean => {
    return [...perioder, ...dager].findIndex(({ årsak }) => årsak === FraværÅrsak.stengtSkoleBhg) >= 0;
};
