import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/src/forms/fravær/types';

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
    [organisasjonsnummerKey: string]: {
        harPerioderMedFravær: YesOrNo;
        fraværPerioder: FraværPeriode[];
        harDagerMedDelvisFravær: YesOrNo;
        fraværDager: FraværDag[];
    };
};
