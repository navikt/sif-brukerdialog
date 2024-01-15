import { YesOrNo } from '@navikt/sif-common-formik-ds/src/types';
import { FraværDag, FraværPeriode, Utenlandsopphold } from '@navikt/sif-common-forms-ds/src';

interface HarKunFulltFravær {
    type: 'harKunFulltFravær';
    harPerioderMedFravær: YesOrNo.YES;
    fraværPerioder: FraværPeriode[];
    harDagerMedDelvisFravær: YesOrNo.NO;
}

interface HarKunDelvisFravær {
    type: 'harKunDelvisFravær';
    harPerioderMedFravær: YesOrNo.NO;
    harDagerMedDelvisFravær: YesOrNo.YES;
    fraværDager: FraværDag[];
}

interface HarFulltOgDelvisFravær {
    type: 'harFulltOgDelvisFravær';
    harPerioderMedFravær: YesOrNo.YES;
    fraværPerioder: FraværPeriode[];
    harDagerMedDelvisFravær: YesOrNo.YES;
    fraværDager: FraværDag[];
}

interface HarVærtIUtlandet {
    perioderHarVærtIUtlandet: YesOrNo;
    perioderUtenlandsopphold: Utenlandsopphold[];
}

export type FraværTypes = HarKunFulltFravær | HarKunDelvisFravær | HarFulltOgDelvisFravær;

export type FraværSøknadsdataMap = {
    [organisasjonsnummer: string]: FraværTypes;
};

export interface FraværSøknadsdata extends HarVærtIUtlandet {
    fravær: FraværSøknadsdataMap;
}
