import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { YtelseKey } from '@navikt/sif-common-core-ds/src/types/Ytelser';

export enum SoknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    beskrivelse = 'beskrivelse',
    ytelse = 'ytelse',
    dokumenter = 'dokumenter',
}

export interface SoknadFormData {
    [SoknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadFormField.harBekreftetOpplysninger]: boolean;
    [SoknadFormField.beskrivelse]?: string;
    [SoknadFormField.ytelse]?: YtelseKey;
    [SoknadFormField.dokumenter]: Attachment[];
}

export const initialSoknadFormData: SoknadFormData = {
    [SoknadFormField.harForståttRettigheterOgPlikter]: false,
    [SoknadFormField.harBekreftetOpplysninger]: false,
    [SoknadFormField.dokumenter]: [],
};
