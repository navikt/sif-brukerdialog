export enum ArbeidsgiverType {
    'PRIVATPERSON' = 'PRIVAT',
    'ORGANISASJON' = 'ORGANISASJON',
}

export interface Arbeidsgiver {
    organisasjonsnummer: string;
    type: ArbeidsgiverType;
    navn: string;
    ansattFom?: Date;
    ansattTom?: Date;
}
