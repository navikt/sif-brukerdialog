import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export enum OmsorgsstønadType {
    mottarIkke = 'MOTTAR_IKKE',
    mottarIDelerAvPerioden = 'MOTTAR_I_DELER_AV_PERIODEN',
    mottarIHelePerioden = 'MOTTAR_I_HELE_PERIODEN',
}

export interface MottarIkkeOmsorgsstønad {
    type: OmsorgsstønadType.mottarIkke;
    mottarOmsorgsstønad: YesOrNo.NO;
}

export interface MottarOmsorgsstønadIHelePeroden {
    type: OmsorgsstønadType.mottarIHelePerioden;
    mottarOmsorgsstønad: YesOrNo.YES;
    mottarOmsorgsstønadIHelePerioden: YesOrNo.YES;
    antallTimer: number;
}

export interface MottarOmsorgsstønadIDelerAvPeroden {
    type: OmsorgsstønadType.mottarIDelerAvPerioden;
    mottarOmsorgsstønad: YesOrNo.YES;
    mottarOmsorgsstønadIHelePerioden: YesOrNo.NO;
    antallTimer: number;
    starterUndeveis: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis: YesOrNo;
    sluttdato?: ISODate;
}

export type OmsorgsstønadSøknadsdata =
    | MottarOmsorgsstønadIHelePeroden
    | MottarIkkeOmsorgsstønad
    | MottarOmsorgsstønadIDelerAvPeroden;
