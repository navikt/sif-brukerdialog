import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { BarnFormValues } from './BarnForm';

export const toBarnFormValues = (søknadsdata: BarnSøknadsdata | undefined): Partial<BarnFormValues> => ({
    stemmerInfoOmBarn: søknadsdata?.stemmerInfoOmBarn ? 'ja' : 'nei',
});

export const toBarnSøknadsdata = (data: BarnFormValues): BarnSøknadsdata => ({
    stemmerInfoOmBarn: data.stemmerInfoOmBarn === 'ja',
});
