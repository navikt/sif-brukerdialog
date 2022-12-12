import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export enum TimerEllerProsent {
    PROSENT = 'prosent',
    TIMER = 'timer',
}

export enum ArbeidIPeriodeFormField {
    periodeFra = 'periodeFra',
    periodeTil = 'periodeTil',
    erLiktHverUke = 'erLiktHverUke',
    timerEllerProsent = 'timerEllerProsent',
    prosentAvNormalt = 'prosentAvNormalt',
    snittTimerPerUke = 'snittTimerPerUke',
}

export type ArbeidsukerFormValues = {
    [key: string]: {
        [ArbeidIPeriodeFormField.prosentAvNormalt]?: string;
        [ArbeidIPeriodeFormField.snittTimerPerUke]?: string;
    };
};

export interface ArbeidIPeriodeFormValues {
    [ArbeidIPeriodeFormField.periodeFra]?: string;
    [ArbeidIPeriodeFormField.periodeTil]?: string;
    [ArbeidIPeriodeFormField.erLiktHverUke]?: YesOrNo;
    [ArbeidIPeriodeFormField.timerEllerProsent]?: TimerEllerProsent;
    [ArbeidIPeriodeFormField.prosentAvNormalt]?: string;
    [ArbeidIPeriodeFormField.snittTimerPerUke]?: string;
}
