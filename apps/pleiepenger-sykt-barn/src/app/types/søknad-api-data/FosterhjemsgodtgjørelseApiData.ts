import { ISODate } from '@navikt/sif-common-utils';
import { FosterhjemsgodtgjørelseType } from '../søknadsdata/FosterhjemsgodtgjørelseSøknadsdata';

type FosterhjemsgodtgjørelseMottarIkke = {
    type: FosterhjemsgodtgjørelseType.mottarIkke;
    mottarFosterhjemsgodtgjørelse: false;
};

type FosterhjemsgodtgjørelseFrikjøptApiData = {
    type: FosterhjemsgodtgjørelseType.mottarFrikjøpt;
    mottarFosterhjemsgodtgjørelse: true;
    erFrikjøptFraJobb: true;
    frikjøptBeskrivelse: string;
};

type FosterhjemsgodtgjørelseIkkeFrikjøptApiData = {
    type: FosterhjemsgodtgjørelseType.mottarIDelerAvPerioden | FosterhjemsgodtgjørelseType.mottarIHelePerioden;
    mottarFosterhjemsgodtgjørelse: true;
    erFrikjøptFraJobb?: false;
    startdato?: ISODate /** dato settes hvis bruker har valgt ja på at det starter i perioden */;
    sluttdato?: ISODate /** dato settes hvis bruker har valgt nei på at det starter i perioden  */;
    _mottarFosterhjemsgodtgjørelseIHelePerioden?: boolean /** feltet ignoreres av apiet  */;
    _starterUndeveis?: boolean /** feltet ignoreres av apiet  */;
    _slutterUnderveis?: boolean /** feltet ignoreres av apiet  */;
};

export type FosterhjemsgodtgjørelseApiData =
    | FosterhjemsgodtgjørelseMottarIkke
    | FosterhjemsgodtgjørelseFrikjøptApiData
    | FosterhjemsgodtgjørelseIkkeFrikjøptApiData;
