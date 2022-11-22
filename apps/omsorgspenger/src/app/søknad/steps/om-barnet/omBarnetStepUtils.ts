import { Søknadsdata, OmBarnetSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnetFormValues } from './OmBarnetStep';

export const getOmBarnetStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmBarnetFormValues
): OmBarnetFormValues => {
    if (formValues) {
        return formValues;
    }
    const { navn = '', alder } = søknadsdata.omBarnet || {};
    return {
        navn,
        alder: alder !== undefined ? `${alder}` : '',
    };
};

export const getOmBarnetSøknadsdataFromFormValues = (values: OmBarnetFormValues): OmBarnetSøknadsdata => {
    return { navn: values.navn, alder: parseInt(values.alder, 10) };
};
