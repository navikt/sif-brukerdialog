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

export interface MedlemskapApiData {
    harBoddIUtlandetSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: BostedUtlandApiData[];
    utenlandsoppholdSiste12Mnd: BostedUtlandApiData[];
}

export interface BostedUtlandApiData extends PeriodeApiData {
    landkode: string;
    landnavn: string;
}

export interface PeriodeApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
}

export interface SøknadApiData {
    pleietrengende: PleietrengendeApiData;
    arbeid: ArbeidApiData | undefined;
    opplæring: OpplæringApiData;
}
