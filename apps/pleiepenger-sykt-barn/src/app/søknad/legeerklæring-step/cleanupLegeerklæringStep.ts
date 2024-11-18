import { getUploadedVedlegg } from '@navikt/sif-common-core-ds/src';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';

export const cleanupLegeerklæringStep = (values: SøknadFormValues): SøknadFormValues => {
    const cleanedValues = { ...values };
    const legeerklæringLastetOpp = getUploadedVedlegg(values[SøknadFormField.legeerklæring]);
    cleanedValues[SøknadFormField.legeerklæring] = legeerklæringLastetOpp;
    return cleanedValues;
};
