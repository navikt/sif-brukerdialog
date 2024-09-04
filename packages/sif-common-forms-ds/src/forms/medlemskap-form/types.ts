import { ISODate } from '@navikt/sif-common-utils';

export interface BostedUtlandApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    landkode: string;
    landnavn: string;
}

export interface MedlemskapApiData {
    harBoddIUtlandetSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: BostedUtlandApiData[];
    utenlandsoppholdSiste12Mnd: BostedUtlandApiData[];
}
