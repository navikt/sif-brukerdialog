import { Søknadsdata, DeltBostedSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { getUploadedAttachments } from '../../../utils/attachmentUtils';
import { DeltBostedFormFields, DeltBostedFormValues } from './DeltBostedForm';

export const getDeltBostedStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: DeltBostedFormValues
): DeltBostedFormValues => {
    if (formValues) {
        return formValues;
    }
    const {} = søknadsdata.deltBosted || {};
    return {
        samværsavtale: [...(søknadsdata.deltBosted?.vedlegg || [])],
    };
};

export const getDeltBostedSøknadsdataFromFormValues = (
    values: DeltBostedFormValues
): DeltBostedSøknadsdata | undefined => {
    const vedlegg = getUploadedAttachments(values[DeltBostedFormFields.samværsavtale]);
    if (vedlegg.length === 0) {
        return undefined;
    }
    return { vedlegg };
};
