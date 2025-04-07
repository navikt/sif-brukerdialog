import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export interface MottarIkkeOmsorgsstønad {
    type: 'mottarIkke';
    mottarOmsorgsstønad: YesOrNo.NO;
}

export interface MottarOmsorgsstønadIHelePeroden {
    type: 'mottarIHelePeroden';
    mottarOmsorgsstønad: YesOrNo.YES;
    mottarOmsorgsstønadIHelePerioden: YesOrNo.YES;
    antallTimer: number;
}

export interface MottarOmsorgsstønadIDelerAvPeroden {
    type: 'mottarIDelerAvPeroden';
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
