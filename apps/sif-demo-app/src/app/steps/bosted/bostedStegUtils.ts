import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { BostedFormValues } from './BostedForm';

export const toBostedFormValues = (søknadsdata: BostedSøknadsdata): BostedFormValues => {
    if (søknadsdata?.borITrondheim === undefined) {
        return {};
    }
    return {
        borITrondheim: søknadsdata.borITrondheim ? 'ja' : 'nei',
    };
};

export const toBostedSøknadsdata = (data: BostedFormValues): BostedSøknadsdata => ({
    borITrondheim: data.borITrondheim === 'ja',
});
