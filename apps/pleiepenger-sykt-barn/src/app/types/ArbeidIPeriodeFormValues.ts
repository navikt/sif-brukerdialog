import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ArbeiderIPeriodenSvar } from '../local-sif-common-pleiepenger';
import { TimerEllerProsent } from './TimerEllerProsent';

export enum MisterHonorarerFraVervIPerioden {
    'misterAlleHonorarer' = 'MISTER_ALLE_HONORARER',
    'misterDelerAvHonorarer' = 'MISTER_DELER_AV_HONORARER',
}

export enum ArbeidIPeriodeFormField {
    arbeiderIPerioden = 'arbeiderIPerioden',
    misterHonorarerFraVervIPerioden = 'misterHonorarerFraVervIPerioden',
    erLiktHverUke = 'erLiktHverUke',
    timerEllerProsent = 'timerEllerProsent',
    prosentAvNormalt = 'prosentAvNormalt',
    snittTimerPerUke = 'snittTimerPerUke',
    arbeidsuker = 'arbeidsuker',
}

export type ArbeidsukerFormValues = {
    [key: string]: {
        [ArbeidIPeriodeFormField.prosentAvNormalt]?: string;
        [ArbeidIPeriodeFormField.snittTimerPerUke]?: string;
    };
};

export interface ArbeidIPeriodeFormValues {
    [ArbeidIPeriodeFormField.arbeiderIPerioden]?: ArbeiderIPeriodenSvar;
    [ArbeidIPeriodeFormField.misterHonorarerFraVervIPerioden]?: MisterHonorarerFraVervIPerioden;
    [ArbeidIPeriodeFormField.erLiktHverUke]?: YesOrNo;
    [ArbeidIPeriodeFormField.timerEllerProsent]?: TimerEllerProsent;
    [ArbeidIPeriodeFormField.prosentAvNormalt]?: string;
    [ArbeidIPeriodeFormField.snittTimerPerUke]?: string;
    [ArbeidIPeriodeFormField.arbeidsuker]?: ArbeidsukerFormValues;
}
