import { ISODate } from '@sif/utils';

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
    fraOgMed: ISODate;
    tilOgMed?: ISODate;
    erPågående?: boolean;
}
