export enum ArbeidsgiverType {
    'PRIVATPERSON' = 'PRIVAT',
    'ORGANISASJON' = 'ORGANISASJON',
}

export interface Arbeidsgiver {
    /** Organisasjonsnummer eller fnr */
    id: string;
    type: ArbeidsgiverType;
    navn: string;
    ansattFom?: Date;
    ansattTom?: Date;
}
