import type { ISODate } from '@sif/utils';

export enum TidspunktForAleneomsorg {
    SISTE_2_ÅRENE = 'SISTE_2_ÅRENE',
    TIDLIGERE = 'TIDLIGERE',
}

export interface AleneomsorgTidspunkt {
    tidspunktForAleneomsorg?: TidspunktForAleneomsorg;
    dato?: ISODate;
}

export interface TidspunktForAleneomsorgFormValues {
    aleneomsorgTidspunkt: Record<string, AleneomsorgTidspunkt>;
}

export interface BarnMedAleneomsorg {
    id: string;
    navn: string;
}
