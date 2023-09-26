import { Søknadsdata, LegeerklæringSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';
import { getUploadedAttachments } from '../../../utils/attachmentUtils';

export const getLegeerklæringStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LegeerklæringFormValues,
): LegeerklæringFormValues => {
    if (formValues) {
        return formValues;
    }
    const {} = søknadsdata.legeerklæring || {};
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
