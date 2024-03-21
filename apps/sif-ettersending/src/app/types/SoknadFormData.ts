import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { YtelseKey } from '@navikt/sif-common-core-ds/src/types/Ytelser';
import { DokumentType } from './DokumentType';

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    dokumentType = 'dokumentType',
    barnetLegeerklæringGjelder = 'barnetLegeerklæringGjelder',
    legeerklæringGjelderEtAnnetBarn = 'legeerklæringGjelderEtAnnetBarn',
    barnetsFødselsnummer = 'barnetsFødselsnummer',
    barnetHarIkkeFnr = 'barnetHarIkkeFnr',
    beskrivelse = 'beskrivelse',
    ytelse = 'ytelse',
    dokumenter = 'dokumenter',
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.dokumentType]?: DokumentType;
    [SoknadFormField.barnetLegeerklæringGjelder]?: string;
    [SoknadFormField.legeerklæringGjelderEtAnnetBarn]?: boolean;
    [SoknadFormField.barnetsFødselsnummer]?: string;
    [SoknadFormField.barnetHarIkkeFnr]?: boolean;
    [SoknadFormField.beskrivelse]?: string;
    [SoknadFormField.ytelse]?: YtelseKey;
    [SoknadFormField.dokumenter]: Attachment[];
}

export const initialSoknadFormData: SoknadFormData = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.dokumenter]: [],
};
