import { ISODate } from '@navikt/sif-common-utils/lib';

export interface BostedUtlandApiData extends PeriodeApiData {
    landkode: string;
    landnavn: string;
}

export interface PeriodeApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
}

export interface PleietrengendeApiData {
    navn: string;
    alder: number;
}

export interface MedlemskapApiData {
    harBoddIUtlandetSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: BostedUtlandApiData[];
    utenlandsoppholdSiste12Mnd: BostedUtlandApiData[];
}
export interface SøknadApiData {
    pleietrengende: PleietrengendeApiData;
    medlemskap?: MedlemskapApiData;
}
