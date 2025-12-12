export interface ArbeidsgiverResponse {
    organisasjoner: Arbeidsgiver[];
}

export interface Arbeidsgiver {
    navn: string;
    organisasjonsnummer: string;
}
