import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export interface MottarIkkeFosterhjemsgodtgjørelse {
    type: 'mottarIkke';
    mottarFosterhjemsgodtgjørelse: YesOrNo.NO;
}

export interface FosterhjemsgodtgjørelseFrikjøpt {
    type: 'mottarFrikjøpt';
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES;
    erFrikjøptFraJobb: YesOrNo.YES;
    frikjøptBeskrivelse: string;
}

export interface MottarFosterhjemsgodtgjørelseIHelePeroden {
    type: 'mottarIHelePeroden';
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES;
    erFrikjøptFraJobb: YesOrNo.NO;
    mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.YES;
}

export interface MottarFosterhjemsgodtgjørelseIDelerAvPeroden {
    type: 'mottarIDelerAvPeroden';
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
