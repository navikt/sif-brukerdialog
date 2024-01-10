import { FraværDag, FraværPeriode, Utenlandsopphold } from '@navikt/sif-common-forms-ds';

interface HarKunFulltFravær {
    type: 'harKunFulltFravær';
    harPerioderMedFravær: true;
    fraværPerioder: FraværPeriode[];
    harDagerMedDelvisFravær: false;
    perioder_harVærtIUtlandet: boolean;
    perioder_utenlandsopphold: Utenlandsopphold[];
}

interface HarKunDelvisFravær {
    type: 'harKunDelvisFravær';
    harPerioderMedFravær: false;
    harDagerMedDelvisFravær: true;
    fraværDager: FraværDag[];
    perioder_harVærtIUtlandet: boolean;
    perioder_utenlandsopphold: Utenlandsopphold[];
}

interface HarFulltOgDelvisFravær {
    type: 'harFulltOgDelvisFravær';
    harPerioderMedFravær: true;
    fraværPerioder: FraværPeriode[];
    harDagerMedDelvisFravær: true;
    fraværDager: FraværDag[];
    perioder_harVærtIUtlandet: boolean;
    perioder_utenlandsopphold: Utenlandsopphold[];
}

export type FraværSøknadsdata = HarKunFulltFravær | HarKunDelvisFravær | HarFulltOgDelvisFravær;
