import { Søknadsdata } from '../../../types/Søknadsdata';
import { OppsummeringFormValues } from './OppsummeringStep';

export const getOppsummeringStepInitialValues = (søknadsdata: Søknadsdata): OppsummeringFormValues => {
    return {
        harBekreftetOpplysninger: søknadsdata.harBekreftetOpplysninger || false,
    };
};
