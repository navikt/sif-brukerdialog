import { Søknadsdata, PleietrengendeSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { PleietrengendeFormValues } from './PleietrengendeStep';

export const getPleietrengendeStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: PleietrengendeFormValues
): PleietrengendeFormValues => {
    if (formValues) {
        return formValues;
    }
    const { navn = '', alder } = søknadsdata.pleietrengende || {};
    return {
        navn,
        alder: alder !== undefined ? `${alder}` : '',
    };
};

export const getPleietrengendeSøknadsdataFromFormValues = (
    values: PleietrengendeFormValues
): PleietrengendeSøknadsdata => {
    return { navn: values.navn, alder: parseInt(values.alder, 10) };
};
