import { Søknadsdata } from '../../../types/Søknadsdata';
import { PleietrengendeFormValues } from './PleietrengendeSteg';

export const getPleietrengendeStegInitialValues = (søknadsdata: Søknadsdata): PleietrengendeFormValues => {
    const { fødselsnummer = '' } = søknadsdata.pleietrengende || {};
    return {
        fødselsnummer,
    };
};
