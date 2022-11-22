import { Søknadsdata, DeltBostedSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { DeltBostedFormValues } from './DeltBostedStep';

export const getDeltBostedStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: DeltBostedFormValues
): DeltBostedFormValues => {
    if (formValues) {
        return formValues;
    }
    const { navn = '', alder } = søknadsdata.deltBosted || {};
    return {
        navn,
        alder: alder !== undefined ? `${alder}` : '',
    };
};

export const getDeltBostedSøknadsdataFromFormValues = (values: DeltBostedFormValues): DeltBostedSøknadsdata => {
    return { navn: values.navn, alder: parseInt(values.alder, 10) };
};
