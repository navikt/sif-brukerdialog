import { Søknadsdata, DeltBostedSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { getUploadedAttachments } from '../../../utils/attachmentUtils';
import { DeltBostedFormFields, DeltBostedFormValues } from './DeltBostedForm';

export const getDeltBostedStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: DeltBostedFormValues,
): DeltBostedFormValues => {
    if (formValues) {
        return formValues;
    }

    return {
        vedlegg: [...(søknadsdata.deltBosted?.vedlegg || [])],
    };
};

export const getDeltBostedSøknadsdataFromFormValues = (values: DeltBostedFormValues): DeltBostedSøknadsdata => {
    return {
        vedlegg: getUploadedAttachments(values[DeltBostedFormFields.vedlegg] || []),
    };
};
