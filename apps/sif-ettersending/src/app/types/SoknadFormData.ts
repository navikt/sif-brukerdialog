import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { DokumentType } from './DokumentType';
import { YtelseKey } from './Ytelser';

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    dokumentType = 'dokumentType',
    registrertBarnAktørId = 'registrertBarnAktørId',
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
    [SoknadFormField.registrertBarnAktørId]?: string;
    [SoknadFormField.barnetsFødselsnummer]?: string;
    [SoknadFormField.barnetHarIkkeFnr]?: boolean;
    [SoknadFormField.beskrivelse]?: string;
    [SoknadFormField.ytelse]?: YtelseKey;
    [SoknadFormField.dokumenter]: Vedlegg[];
}

export const initialSoknadFormData: SoknadFormData = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.dokumenter]: [],
};
