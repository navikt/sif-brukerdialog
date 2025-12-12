export enum ArbeidsgiverType {
    'PRIVATPERSON' = 'PRIVAT',
    'ORGANISASJON' = 'ORGANISASJON',
    'FRILANSOPPDRAG' = 'FRILANSOPPDRAG',
}
export interface Arbeidsgiver {
    /** Organisasjonsnummer eller fødselsnummer */
    id: string;
    type: ArbeidsgiverType;
    organisasjonsnummer?: string;
    offentligIdent?: string;
    navn: string;
    ansattFom?: Date;
    ansattTom?: Date;
}
