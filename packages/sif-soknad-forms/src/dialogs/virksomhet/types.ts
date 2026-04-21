import { ISODate } from '@navikt/sif-common-utils';
import { YesOrNo } from '@sif/rhf';

export enum Næringstype {
    'FISKE' = 'FISKE',
    'JORDBRUK_SKOGBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNEN' = 'ANNEN',
}

export interface Virksomhet {
    id: string;
    næringstype: Næringstype;
    fiskerErPåBladB?: YesOrNo;
    fom: Date;
    tom?: Date;
    erPågående?: boolean;
    næringsinntekt?: number;
    navnPåVirksomheten: string;
    organisasjonsnummer?: string;
    registrertINorge: YesOrNo;
    registrertILand?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: YesOrNo;
    blittYrkesaktivDato?: Date;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: YesOrNo;
    varigEndringINæringsinntekt_dato?: Date;
    varigEndringINæringsinntekt_inntektEtterEndring?: number;
    varigEndringINæringsinntekt_forklaring?: string;
    harRegnskapsfører: YesOrNo;
    regnskapsfører_navn?: string;
    regnskapsfører_telefon?: string;
}

export interface VirksomhetApiData {
    næringstype: Næringstype;
    fiskerErPåBladB?: boolean;
    fraOgMed: ISODate;
    tilOgMed?: ISODate | null;
    erNyoppstartet: boolean;
    næringsinntekt?: number;
    navnPåVirksomheten: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertIUtlandet?: {
        landkode: string;
        landnavn: string;
    };
    yrkesaktivSisteTreFerdigliknedeÅrene?: {
        oppstartsdato: ISODate;
    };
    varigEndring?: {
        dato: ISODate;
        inntektEtterEndring: number;
        forklaring: string;
    };
    regnskapsfører?: {
        navn: string;
        telefon: string;
    };
    harFlereAktiveVirksomheter: boolean;
}
