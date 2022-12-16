import { TimerEllerProsent } from '../../types/TimerEllerProsent';

export enum ArbeidIPeriodeFormField {
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
    [ArbeidIPeriodeFormField.timerEllerProsent]?: TimerEllerProsent;
    [ArbeidIPeriodeFormField.prosentAvNormalt]?: string;
    [ArbeidIPeriodeFormField.snittTimerPerUke]?: string;
}
