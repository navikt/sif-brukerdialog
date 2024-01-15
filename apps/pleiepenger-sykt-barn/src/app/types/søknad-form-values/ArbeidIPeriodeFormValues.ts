import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../TimerEllerProsent';

export enum ArbeidIPeriodeFormField {
    arbeiderIPerioden = 'arbeiderIPerioden',
    erLiktHverUke = 'erLiktHverUke',
    timerEllerProsent = 'timerEllerProsent',
    prosentAvNormalt = 'prosentAvNormalt',
    snittTimerPerUke = 'snittTimerPerUke',
    arbeidsuker = 'arbeidsuker',
}

export type ArbeidsukerFormValues = {
    [key: string]: {
        [ArbeidIPeriodeFormField.snittTimerPerUke]?: string;
    };
};

export interface ArbeidIPeriodeFormValues {
    [ArbeidIPeriodeFormField.arbeiderIPerioden]?: ArbeiderIPeriodenSvar;
    [ArbeidIPeriodeFormField.erLiktHverUke]?: YesOrNo;
    [ArbeidIPeriodeFormField.timerEllerProsent]?: TimerEllerProsent;
    [ArbeidIPeriodeFormField.prosentAvNormalt]?: string;
    [ArbeidIPeriodeFormField.snittTimerPerUke]?: string;
    [ArbeidIPeriodeFormField.arbeidsuker]?: ArbeidsukerFormValues;
}
