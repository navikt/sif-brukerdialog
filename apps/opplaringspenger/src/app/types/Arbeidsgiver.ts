export enum ArbeidsgiverType {
    'PRIVATPERSON' = 'PRIVAT',
    'ORGANISASJON' = 'ORGANISASJON',
    'FRILANSOPPDRAG' = 'FRILANSOPPDRAG',
}
export interface Arbeidsgiver {
    /** Organisasjonsnummer eller fødselsnummer */
    id: string;
    organisasjonsnummer?: string;
    offentligIdent?: string;
    type: ArbeidsgiverType;
    navn: string;
    ansattFom?: Date;
    ansattTom?: Date;
}
