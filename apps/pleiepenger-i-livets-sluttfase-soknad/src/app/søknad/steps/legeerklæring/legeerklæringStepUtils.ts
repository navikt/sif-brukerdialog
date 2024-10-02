import { getUploadedAttachments } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { Søknadsdata, LegeerklæringSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';

export const getLegeerklæringStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LegeerklæringFormValues,
): LegeerklæringFormValues => {
    if (formValues) {
        return formValues;
    }
    return {
        vedlegg: [...(søknadsdata.legeerklæring?.vedlegg || [])],
    };
};

export const getLegeerklæringSøknadsdataFromFormValues = (
    values: LegeerklæringFormValues,
): LegeerklæringSøknadsdata => {
    return {
        vedlegg: getUploadedAttachments(values[LegeerklæringFormFields.vedlegg] || []),
    };
};
