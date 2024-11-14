import { getUploadedVedlegg, vedleggIsUploadedAndValid } from '@navikt/sif-common-core-ds/src';
import { DeltBostedSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { DeltBostedFormFields, DeltBostedFormValues } from './DeltBostedForm';

export const getDeltBostedStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: DeltBostedFormValues,
): DeltBostedFormValues => {
    if (formValues) {
        return formValues;
    }
    return {
        vedlegg: [...(søknadsdata.deltBosted?.vedlegg || [])].filter(vedleggIsUploadedAndValid),
    };
};

export const getDeltBostedSøknadsdataFromFormValues = (values: DeltBostedFormValues): DeltBostedSøknadsdata => {
    return {
        vedlegg: getUploadedVedlegg(values[DeltBostedFormFields.vedlegg] || []),
    };
};
