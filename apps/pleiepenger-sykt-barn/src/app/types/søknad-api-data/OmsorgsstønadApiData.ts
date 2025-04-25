import { ISODate, ISODuration } from '@navikt/sif-common-utils';
import { OmsorgsstønadType } from '../søknadsdata/OmsorgsstønadSøknadsdata';

type OmsorgsstønadMottarIkkeApiData = {
    type: OmsorgsstønadType.mottarIkke;
    mottarOmsorgsstønad: false;
};
type OmsorgsstønadMottarDelerAvPeriodenApiData = {
    type: OmsorgsstønadType.mottarIDelerAvPerioden;
    mottarOmsorgsstønad: boolean;
    startdato?: ISODate /** dato settes hvis bruker har valgt ja på at det starter i perioden */;
    sluttdato?: ISODate /** dato settes hvis bruker har valgt nei på at det starter i perioden  */;
    antallTimerIUken: ISODuration /** Antall timer i uken en mottar omsorgsstønad */;
    /** felter som ignoreres av apiet  */
    _mottarOmsorgsstønadIHelePeroden: false;
    _starterUndeveis?: boolean;
    _slutterUnderveis?: boolean;
};
type OmsorgsstønadMottarHelePeriodenApiData = {
    type: OmsorgsstønadType.mottarIHelePerioden;
    mottarOmsorgsstønad: boolean;
    antallTimerIUken: ISODuration /** Antall timer i uken en mottar omsorgsstønad */;
    _mottarOmsorgsstønadIHelePeroden: true /** feltet ignoreres av apiet  */;
};

export type OmsorgsstønadApiData =
    | OmsorgsstønadMottarIkkeApiData
    | OmsorgsstønadMottarDelerAvPeriodenApiData
    | OmsorgsstønadMottarHelePeriodenApiData;
