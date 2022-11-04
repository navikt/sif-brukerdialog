import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';

export enum Arbeidssituasjon {
    'arbeidstaker' = 'ARBEIDSTAKER',
    'selvstendigNæringsdrivende' = 'SELVSTENDIG_NÆRINGSDRIVENDE',
    'frilanser' = 'FRILANSER',
    'annen' = 'ANNEN',
}

export enum Mottaker {
    'samværsforelder' = 'SAMVÆRSFORELDER',
    'ektefelle' = 'EKTEFELLE',
    'samboer' = 'SAMBOER',
}

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    gjelderMidlertidigPgaKorona = 'gjelderMidlertidigPgaKorona',
    skalDeleMedAndreForelderSamboerEktefelle = 'skalDeleMedAndreForelderSamboerEktefelle',
    mottakerType = 'mottakerType',
    fnrMottaker = 'fnrMottaker',
    navnMottaker = 'navnMottaker',
    antallDagerSomSkalOverføres = 'antallDagerSomSkalOverføres',
    andreBarn = 'andreBarn',
    harAleneomsorg = 'harAleneomsorg',
    harAleneomsorgFor = 'harAleneomsorgFor',
    harUtvidetRett = 'harUtvidetRett',
    harUtvidetRettFor = 'harUtvidetRettFor',
    erYrkesaktiv = 'erYrkesaktiv',
    arbeiderINorge = 'arbeiderINorge',
    arbeidssituasjon = 'arbeidssituasjon',
    harBruktOmsorgsdagerIÅr = 'harBruktOmsorgsdagerIÅr',
    antallDagerBruktIÅr = 'antallDagerBruktIÅr',
    samværsavtale = 'samværsavtale',
}

export interface Barn {
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
    aktørId: string;
    fødselsdato: Date;
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.gjelderMidlertidigPgaKorona]: YesOrNo;
    [SoknadFormField.skalDeleMedAndreForelderSamboerEktefelle]: YesOrNo;
    [SoknadFormField.mottakerType]?: Mottaker;
    [SoknadFormField.fnrMottaker]: string;
    [SoknadFormField.navnMottaker]: string;
    [SoknadFormField.antallDagerSomSkalOverføres]?: string;

    [SoknadFormField.andreBarn]: AnnetBarn[];
    [SoknadFormField.harAleneomsorg]: YesOrNo;
    [SoknadFormField.harAleneomsorgFor]: Array<string>;
    [SoknadFormField.harUtvidetRett]: YesOrNo;
    [SoknadFormField.harUtvidetRettFor]: Array<string>;

    [SoknadFormField.erYrkesaktiv]: YesOrNo;
    [SoknadFormField.arbeiderINorge]: YesOrNo;
    [SoknadFormField.arbeidssituasjon]: Arbeidssituasjon[];
    [SoknadFormField.harBruktOmsorgsdagerIÅr]: YesOrNo;
    [SoknadFormField.antallDagerBruktIÅr]?: string;

    [SoknadFormField.samværsavtale]: Attachment[];
}

export type DineBarnFormData = Pick<SoknadFormData, SoknadFormField.andreBarn>;

export type OmBarnaFormData = Pick<
    SoknadFormData,
    | SoknadFormField.harAleneomsorg
    | SoknadFormField.harAleneomsorgFor
    | SoknadFormField.harUtvidetRett
    | SoknadFormField.harUtvidetRettFor
>;

export type DinSituasjonFormData = Pick<
    SoknadFormData,
    | SoknadFormField.erYrkesaktiv
    | SoknadFormField.arbeiderINorge
    | SoknadFormField.arbeidssituasjon
    | SoknadFormField.harBruktOmsorgsdagerIÅr
    | SoknadFormField.antallDagerBruktIÅr
>;

export type MottakerFormData = Pick<
    SoknadFormData,
    | SoknadFormField.mottakerType
    | SoknadFormField.fnrMottaker
    | SoknadFormField.navnMottaker
    | SoknadFormField.antallDagerSomSkalOverføres
    | SoknadFormField.gjelderMidlertidigPgaKorona
>;
