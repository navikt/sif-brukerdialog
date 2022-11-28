import { Søknadsdata, PleietrengendeSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { PleietrengendeFormValues } from './PleietrengendeStep';

const pleietrengendeInitialFormValues: PleietrengendeFormValues = {
    navn: '',
    alder: '',
};

export const getPleietrengendeStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: PleietrengendeFormValues
): PleietrengendeFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.pleietrengende === undefined) {
        return pleietrengendeInitialFormValues;
    }
    const { navn, alder } = søknadsdata.pleietrengende;
    return {
        navn,
        alder: `${alder}`,
    };
};

export const getPleietrengendeSøknadsdataFromFormValues = (
    values: PleietrengendeFormValues
): PleietrengendeSøknadsdata => {
    return { navn: values.navn, alder: parseInt(values.alder, 10) };
};
