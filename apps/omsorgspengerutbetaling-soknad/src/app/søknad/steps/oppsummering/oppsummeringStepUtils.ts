import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from './OppsummeringStep';

export const getOppsummeringStepInitialValues = (søknadsdata: Søknadsdata): OppsummeringFormValues => {
    return {
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger || false,
    };
};

export const timeText = (timer: string): string =>
    timer === '0' || timer === '0.5' || timer === '1' ? 'time' : 'timer';
