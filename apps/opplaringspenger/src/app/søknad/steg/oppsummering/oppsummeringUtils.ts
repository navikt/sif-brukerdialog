import { Søknadsdata } from '../../../types/Søknadsdata';
import { OppsummeringFormValues } from './OppsummeringSteg';

export const getOppsummeringStegInitialValues = (søknadsdata: Søknadsdata): OppsummeringFormValues => {
    return {
        harBekreftetOpplysninger: søknadsdata.harBekreftetOpplysninger || false,
    };
};
