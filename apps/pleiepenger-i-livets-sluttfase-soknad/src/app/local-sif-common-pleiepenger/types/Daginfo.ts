import { ISODate, Weekday } from '@navikt/sif-common-utils';

export interface Daginfo {
    isoDate: ISODate;
    dato: Date;
    ukedag: number;
    årOgUke: string;
    ukenummer: number;
    år: number;
    labelDag: string;
    labelDato: string;
    labelFull: string;
    weekday?: Weekday;
}
