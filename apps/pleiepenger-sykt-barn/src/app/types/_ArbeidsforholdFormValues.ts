import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ArbeidIPeriodeFormValues } from './_ArbeidIPeriodeFormValues';
import { Arbeidsgiver } from './_Arbeidsgiver';

export enum ArbeidsforholdFormField {
    erAnsatt = 'erAnsatt',
    sluttetFørSøknadsperiode = 'sluttetFørSøknadsperiode',
    normalarbeidstid_TimerPerUke = 'normalarbeidstid.timerPerUke',
    arbeidIPeriode = 'arbeidIPeriode',
}

export type NormalarbeidstidFormValues = {
    timerPerUke?: string;
};

export interface ArbeidsforholdFormValues {
    arbeidsgiver: Arbeidsgiver;
    erAnsatt?: YesOrNo;
    sluttetFørSøknadsperiode?: YesOrNo;
    normalarbeidstid?: NormalarbeidstidFormValues;
    arbeidIPeriode?: ArbeidIPeriodeFormValues;
}

export type ArbeidsforholdFrilanserFormValues = Omit<
    ArbeidsforholdFormValues,
    'arbeidsgiver' | 'erAnsatt' | 'sluttetFørSøknadsperiode'
>;

export type ArbeidsforholdSelvstendigFormValues = Omit<
    ArbeidsforholdFormValues,
    'arbeidsgiver' | 'erAnsatt' | 'sluttetFørSøknadsperiode'
>;
