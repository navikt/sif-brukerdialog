import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { YtelseKey } from '@navikt/sif-common-core-ds/src/types/Ytelser';
import { DokumentType } from './DokumentType';

export interface RegistrertBarnFormData {
    aktørId: string;
    barnetsNavn: string;
    barnetsFødselsdato: Date;
}

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    dokumentType = 'dokumentType',
    registrertBarnAktørId = 'registrertBarnAktørId',
    valgteRegistrertBarn = 'valgteRegistrertBarn',
    gjelderEtAnnetBarn = 'gjelderEtAnnetBarn',
    barnetsFødselsnummer = 'barnetsFødselsnummer',
    beskrivelse = 'beskrivelse',
    ytelse = 'ytelse',
    dokumenter = 'dokumenter',
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.dokumentType]?: DokumentType;
    [SoknadFormField.registrertBarnAktørId]?: string;
    [SoknadFormField.valgteRegistrertBarn]?: RegistrertBarnFormData;
    [SoknadFormField.gjelderEtAnnetBarn]?: boolean;
    [SoknadFormField.barnetsFødselsnummer]?: string;
    [SoknadFormField.beskrivelse]?: string;
    [SoknadFormField.ytelse]?: YtelseKey;
    [SoknadFormField.dokumenter]: Attachment[];
}

export const initialSoknadFormData: SoknadFormData = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.dokumenter]: [],
};
