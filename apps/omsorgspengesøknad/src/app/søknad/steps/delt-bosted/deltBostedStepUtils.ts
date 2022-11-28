import { Søknadsdata, DeltBostedSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
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
        samværsavtale: [],
    };
};

export const getDeltBostedSøknadsdataFromFormValues = (values: DeltBostedFormValues): DeltBostedSøknadsdata => {
    return { samværsavtale: values[DeltBostedFormFields.samværsavtale] };
};
