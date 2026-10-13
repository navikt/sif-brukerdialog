import { ISODate } from '@sif/utils';

export enum OpptjeningAktivitet {
    ARBEIDSTAKER = 'ARBEIDSTAKER',
    FRILANSER = 'FRILANSER',
}

export interface OpptjeningUtland {
    id: string;
    fom: ISODate;
    tom: ISODate;
    landkode: string;
    opptjeningType: OpptjeningAktivitet;
    navn: string;
}
