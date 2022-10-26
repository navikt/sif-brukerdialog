import { PleietrengendeSøknadsdata, Søknadsdata } from '../../../types/Søknadsdata';
import { PleietrengendeFormValues } from './PleietrengendeStep';

export const getPleietrengendeStepInitialValues = (søknadsdata: Søknadsdata): PleietrengendeFormValues => {
    const { fødselsnummer = '' } = søknadsdata.pleietrengende || {};
    return {
        fødselsnummer,
    };
};

export const getPleietrengendeSøknadsdataFromFormValues = (
    values: PleietrengendeFormValues
): PleietrengendeSøknadsdata => {
    return { fødselsnummer: values.fødselsnummer };
};
