import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export enum Næringstype {
    'FISKE' = 'FISKE',
    'JORDBRUK_SKOGBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNEN' = 'ANNEN',
}

export enum VirksomhetFormField {
    'næringstype' = 'næringstype',
    'fiskerErPåBladB' = 'fiskerErPåBladB',
    'fom' = 'fom',
    'tom' = 'tom',
    'næringsinntekt' = 'næringsinntekt',
    'erPågående' = 'erPågående',
    'navnPåVirksomheten' = 'navnPåVirksomheten',
    'organisasjonsnummer' = 'organisasjonsnummer',
    'registrertINorge' = 'registrertINorge',
    'registrertILand' = 'registrertILand',
    'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene' = 'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene',
    'blittYrkesaktivDato' = 'blittYrkesaktivDato',
    'hattVarigEndringAvNæringsinntektSiste4Kalenderår' = 'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
    'varigEndringINæringsinntekt_dato' = 'varigEndringINæringsinntekt_dato',
    'varigEndringINæringsinntekt_inntektEtterEndring' = 'varigEndringINæringsinntekt_inntektEtterEndring',
    'varigEndringINæringsinntekt_forklaring' = 'varigEndringINæringsinntekt_forklaring',
    'endretNæringsinntektInformasjon' = 'endretNæringsinntektInformasjon',
    'harRegnskapsfører' = 'harRegnskapsfører',
    'regnskapsfører' = 'regnskapsfører',
    'regnskapsfører_navn' = 'regnskapsfører_navn',
    'regnskapsfører_telefon' = 'regnskapsfører_telefon',
}

export interface Virksomhet {
    id?: string;
    [VirksomhetFormField.næringstype]: Næringstype;
    [VirksomhetFormField.fiskerErPåBladB]?: YesOrNo;
    [VirksomhetFormField.fom]: Date;
    [VirksomhetFormField.tom]?: Date;
    [VirksomhetFormField.næringsinntekt]?: number;
    [VirksomhetFormField.erPågående]?: boolean;
    [VirksomhetFormField.navnPåVirksomheten]: string;
    [VirksomhetFormField.organisasjonsnummer]?: string;
    [VirksomhetFormField.registrertINorge]: YesOrNo;
    [VirksomhetFormField.registrertILand]?: string;
    [VirksomhetFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene]?: YesOrNo;
    [VirksomhetFormField.blittYrkesaktivDato]?: Date;
    [VirksomhetFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår]?: YesOrNo;
    [VirksomhetFormField.varigEndringINæringsinntekt_dato]?: Date;
    [VirksomhetFormField.varigEndringINæringsinntekt_inntektEtterEndring]?: number;
    [VirksomhetFormField.varigEndringINæringsinntekt_forklaring]?: string;
    [VirksomhetFormField.harRegnskapsfører]: YesOrNo;
    [VirksomhetFormField.regnskapsfører_navn]?: string;
    [VirksomhetFormField.regnskapsfører_telefon]?: string;
}
export type VirksomhetFormValues = Partial<
    Omit<
        Virksomhet,
        | 'fom'
        | 'tom'
        | 'blittYrkesaktivDato'
        | 'næringsinntekt'
        | 'varigEndringINæringsinntekt_dato'
        | 'varigEndringINæringsinntekt_inntektEtterEndring'
    > & {
        [VirksomhetFormField.fom]: string;
        [VirksomhetFormField.tom]?: string;
        [VirksomhetFormField.blittYrkesaktivDato]?: string;
        [VirksomhetFormField.næringsinntekt]?: string;
        [VirksomhetFormField.varigEndringINæringsinntekt_dato]?: string;
        [VirksomhetFormField.varigEndringINæringsinntekt_inntektEtterEndring]?: string;
    }
>;

export const isVirksomhet = (virksomhet: Partial<Virksomhet>): virksomhet is Virksomhet => {
    return virksomhet !== undefined;
};

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
