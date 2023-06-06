export interface Arbeidsgiver {
    key: string /** orgnummer prefixet med a_ */;
    organisasjonsnummer: string;
    navn: string;
    ansattFom?: Date;
    ansattTom?: Date;
}
