import { Søknadsdata } from '../../../types/Søknadsdata';
import { PleietrengendeFormValues } from './PleietrengendeStep';

export const getPleietrengendeStepInitialValues = (søknadsdata: Søknadsdata): PleietrengendeFormValues => {
    const { fødselsnummer = '' } = søknadsdata.pleietrengende || {};
    return {
        fødselsnummer,
    };
};
