import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { BostedFormValues } from './BostedForm';

export const toBostedSøknadsdata = (data: BostedFormValues): BostedSøknadsdata => ({
    borITrondheim: data.borITrondheim === 'ja',
});

export const toBostedFormValues = (søknadsdata: BostedSøknadsdata): BostedFormValues => ({
    borITrondheim: søknadsdata?.borITrondheim ? 'ja' : 'nei',
});
