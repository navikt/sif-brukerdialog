import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { ApplicationType } from './ApplicationType';

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    beskrivelse = 'beskrivelse',
    søknadstype = 'søknadstype',
    dokumenter = 'dokumenter',
    dokumenterGruppe = 'dokumenterGruppe',
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.beskrivelse]?: string;
    [SoknadFormField.søknadstype]?: ApplicationType;
    [SoknadFormField.dokumenter]: Attachment[];
}

export const initialSoknadFormData: SoknadFormData = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.dokumenter]: [],
};
