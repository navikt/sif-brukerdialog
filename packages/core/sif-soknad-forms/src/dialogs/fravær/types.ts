import { ISODate } from '@sif/utils';

export interface FraværPeriode {
    id: string;
    fraOgMed: ISODate;
    tilOgMed: ISODate;
}

export interface FraværDag {
    id: string;
    dato: ISODate;
    timerArbeidsdag: string;
    timerFravær: string;
}
