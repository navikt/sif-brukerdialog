import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { AnnetBarn } from '@navikt/sif-common-forms/lib/annet-barn/types';
import { Attachment } from '@navikt/sif-common-core/lib/types/Attachment';

export enum Arbeidssituasjon {
    'arbeidstaker' = 'arbeidstaker',
    'selvstendigNæringsdrivende' = 'selvstendigNæringsdrivende',
    'frilanser' = 'frilanser',
    'annen' = 'annen',
}

export enum Mottaker {
    'samværsforelder' = 'samværsforelder',
    'ektefelle' = 'ektefelle',
    'samboer' = 'samboer',
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
    harBruktOmsorgsdagerEtter1Juli = 'harBruktOmsorgsdagerEtter1Juli',
    antallDagerBruktEtter1Juli = 'antallDagerBruktEtter1Juli',

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
    [SoknadFormField.harBruktOmsorgsdagerEtter1Juli]: YesOrNo;
    [SoknadFormField.antallDagerBruktEtter1Juli]?: string;

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
    | SoknadFormField.harBruktOmsorgsdagerEtter1Juli
    | SoknadFormField.antallDagerBruktEtter1Juli
>;

export type MottakerFormData = Pick<
    SoknadFormData,
    | SoknadFormField.mottakerType
    | SoknadFormField.fnrMottaker
    | SoknadFormField.navnMottaker
    | SoknadFormField.antallDagerSomSkalOverføres
    | SoknadFormField.gjelderMidlertidigPgaKorona
>;
