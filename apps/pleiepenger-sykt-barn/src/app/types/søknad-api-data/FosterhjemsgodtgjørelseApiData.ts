import { ISODate } from '@navikt/sif-common-utils';

export interface FosterhjemsgodtgjørelseApiData {
    mottarFosterhjemsgodtgjørelse: boolean;
    erFrikjøptFraJobb?: boolean;
    frikjøptBeskrivelse?: string;
    startdato?: ISODate /** dato settes hvis bruker har valgt ja på at det starter i perioden */;
    sluttdato?: ISODate /** dato settes hvis bruker har valgt nei på at det starter i perioden  */;

    _mottarFosterhjemsgodtgjørelseIHelePerioden?: boolean /** feltet ignoreres av apiet  */;
    _starterUndeveis?: boolean /** feltet ignoreres av apiet  */;
    _slutterUnderveis?: boolean /** feltet ignoreres av apiet  */;
}
