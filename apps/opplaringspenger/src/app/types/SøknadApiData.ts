import { ISODate } from '@navikt/sif-common-utils/lib';

export interface ArbeidApiData {
    startdato?: ISODate;
}

export interface BarnApiData {
    fornavn: string;
    etternavn: string;
    fødselsdato: ISODate;
}

export interface OpplæringApiData {
    beskrivelse: string;
}

export interface SøknadApiData {
    barn: BarnApiData;
    arbeid: ArbeidApiData | undefined;
    opplæring: OpplæringApiData;
}
