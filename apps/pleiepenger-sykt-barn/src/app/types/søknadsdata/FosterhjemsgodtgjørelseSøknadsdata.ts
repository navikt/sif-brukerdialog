import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export enum FosterhjemsgodtgjørelseType {
    'mottarIkke' = 'mottarIkke',
    'mottarFrikjøpt' = 'mottarFrikjøpt',
    'mottarIHelePerioden' = 'mottarIHelePerioden',
    'mottarIDelerAvPerioden' = 'mottarIDelerAvPerioden',
}

export interface MottarIkkeFosterhjemsgodtgjørelse {
    type: FosterhjemsgodtgjørelseType.mottarIkke;
    mottarFosterhjemsgodtgjørelse: YesOrNo.NO;
}

export interface FosterhjemsgodtgjørelseFrikjøpt {
    type: FosterhjemsgodtgjørelseType.mottarFrikjøpt;
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES;
    erFrikjøptFraJobb: YesOrNo.YES;
    frikjøptBeskrivelse: string;
}

export interface MottarFosterhjemsgodtgjørelseIHelePeroden {
    type: FosterhjemsgodtgjørelseType.mottarIHelePerioden;
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES;
    erFrikjøptFraJobb: YesOrNo.NO;
    mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.YES;
}

export interface MottarFosterhjemsgodtgjørelseIDelerAvPeroden {
    type: FosterhjemsgodtgjørelseType.mottarIDelerAvPerioden;
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES;
    erFrikjøptFraJobb: YesOrNo.NO;
    mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.NO;
    starterUndeveis: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis: YesOrNo;
    sluttdato?: ISODate;
}

export type FosterhjemsgodtgjørelseSøknadsdata =
    | MottarFosterhjemsgodtgjørelseIHelePeroden
    | FosterhjemsgodtgjørelseFrikjøpt
    | MottarIkkeFosterhjemsgodtgjørelse
    | MottarFosterhjemsgodtgjørelseIDelerAvPeroden;
