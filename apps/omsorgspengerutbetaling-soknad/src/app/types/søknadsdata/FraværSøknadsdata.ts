import { FraværDag, FraværPeriode, Utenlandsopphold } from '@navikt/sif-common-forms-ds';
import { DateRange } from '@navikt/sif-common-utils';

interface HarKunFulltFravær {
    type: 'harKunFulltFravær';
    harPerioderMedFravær: true;
    fraværPerioder: FraværPeriode[];
    harDagerMedDelvisFravær: false;
    perioder_harVærtIUtlandet: boolean;
    perioder_utenlandsopphold: Utenlandsopphold[];
    førsteOgSisteDagMedFravær: DateRange;
}

interface HarKunDelvisFravær {
    type: 'harKunDelvisFravær';
    harPerioderMedFravær: false;
    harDagerMedDelvisFravær: true;
    fraværDager: FraværDag[];
    perioder_harVærtIUtlandet: boolean;
    perioder_utenlandsopphold: Utenlandsopphold[];
    førsteOgSisteDagMedFravær: DateRange;
}

interface HarFulltOgDelvisFravær {
    type: 'harFulltOgDelvisFravær';
    harPerioderMedFravær: true;
    fraværPerioder: FraværPeriode[];
    harDagerMedDelvisFravær: true;
    fraværDager: FraværDag[];
    perioder_harVærtIUtlandet: boolean;
    perioder_utenlandsopphold: Utenlandsopphold[];
    førsteOgSisteDagMedFravær: DateRange;
}

export type FraværSøknadsdata = HarKunFulltFravær | HarKunDelvisFravær | HarFulltOgDelvisFravær;
