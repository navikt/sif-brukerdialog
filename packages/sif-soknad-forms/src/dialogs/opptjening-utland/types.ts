export enum OpptjeningAktivitet {
    ARBEIDSTAKER = 'ARBEIDSTAKER',
    FRILANSER = 'FRILANSER',
}

export interface OpptjeningUtland {
    id: string;
    fom: Date;
    tom: Date;
    landkode: string;
    opptjeningType: OpptjeningAktivitet;
    navn: string;
}
