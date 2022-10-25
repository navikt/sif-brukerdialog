import { ISODate } from '@navikt/sif-common-utils/lib';

export interface ArbeidApiData {
    startdato?: ISODate;
}

export interface PleietrengendeApiData {
    fødselsnummer: string;
}

export interface OpplæringApiData {
    beskrivelse: string;
}

export interface SøknadApiData {
    pleietrengende: PleietrengendeApiData;
    arbeid: ArbeidApiData | undefined;
    opplæring: OpplæringApiData;
}
