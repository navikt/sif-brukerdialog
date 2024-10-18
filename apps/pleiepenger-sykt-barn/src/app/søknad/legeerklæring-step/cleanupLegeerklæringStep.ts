import { getUploadedAttachments } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';

export const cleanupLegeerklæringStep = (values: SøknadFormValues): SøknadFormValues => {
    const cleanedValues = { ...values };
    const legeerklæringLastetOpp = getUploadedAttachments(values[SøknadFormField.legeerklæring]);
    cleanedValues[SøknadFormField.legeerklæring] = legeerklæringLastetOpp;
    return cleanedValues;
};
