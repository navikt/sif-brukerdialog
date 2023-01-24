export enum ArbeidsgiverType {
    'PRIVATPERSON' = 'PRIVAT',
    'ORGANISASJON' = 'ORGANISASJON',
}

export interface ArbeidstidArbeidsgiver {
    /** Organisasjonsnummer eller fødselsnummer */
    id: string;
    type: ArbeidsgiverType;
}
export interface Arbeidsgiver {
    /** Organisasjonsnummer eller fødselsnummer */
    id: string;
    type: ArbeidsgiverType;
    navn: string;
    ansattFom?: Date;
    ansattTom?: Date;
    erUkjentIAareg?: boolean;
}
