import { Ansettelsesperiode } from '../api/getArbeidsgivereRemoteData';

export enum ArbeidsgiverType {
    PRIVATPERSON = 'PRIVAT',
    ORGANISASJON = 'ORGANISASJON',
    FRILANSOPPDRAG = 'FRILANSOPPDRAG',
}
export interface Arbeidsgiver {
    /** Organisasjonsnummer eller fødselsnummer */
    type: ArbeidsgiverType;
    id: string;
    organisasjonsnummer?: string;
    offentligIdent?: string;
    navn: string;
    ansattFom?: Date;
    ansattTom?: Date;
    ansettelsesperioder?: Ansettelsesperiode[];
}
