import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/lib';

export enum FraværFormFields {
    harPerioderMedFravær = 'harPerioderMedFravær',
    harDagerMedDelvisFravær = 'harDagerMedDelvisFravær',
    fraværPerioder = 'fraværPerioder',
    fraværDager = 'fraværDager',
}

export type Fravær = {
    [FraværFormFields.harPerioderMedFravær]: YesOrNo;
    [FraværFormFields.fraværPerioder]: FraværPeriode[];
    [FraværFormFields.harDagerMedDelvisFravær]: YesOrNo;
    [FraværFormFields.fraværDager]: FraværDag[];
};

export type FraværMap = {
    [organisasjonsnummer: string]: {
        harPerioderMedFravær: YesOrNo;
        fraværPerioder: FraværPeriode[];
        harDagerMedDelvisFravær: YesOrNo;
        fraværDager: FraværDag[];
    };
};
