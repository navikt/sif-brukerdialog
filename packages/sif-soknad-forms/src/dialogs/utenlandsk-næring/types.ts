export enum UtenlandskNæringstype {
    'FISKE' = 'FISKE',
    'JORDBRUK_SKOGBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNEN' = 'ANNEN',
}

export interface UtenlandskNæring {
    id: string;
    næringstype: UtenlandskNæringstype;
    navnPåVirksomheten: string;
    identifikasjonsnummer?: string;
    land: string;
    fraOgMed: Date;
    tilOgMed?: Date;
    erPågående?: boolean;
}
