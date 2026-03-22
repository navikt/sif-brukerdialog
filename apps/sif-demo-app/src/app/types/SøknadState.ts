import { RegistrertBarn, Søker } from '@sif/api';

import { Søknadsdata } from './Søknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}
