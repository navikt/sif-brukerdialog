export enum Aktivitet {
    FRILANSER = 'FRILANSER',
    SELVSTENDIG_VIRKSOMHET = 'SELVSTENDIG_VIRKSOMHET',
    BEGGE = 'BEGGE',
}
export enum ApiAktivitet {
    FRILANSER = 'FRILANSER',
    SELVSTENDIG_VIRKSOMHET = 'SELVSTENDIG_VIRKSOMHET',
}

export interface AktivitetFravær {
    dato: Date;
    aktivitet: Aktivitet;
}
