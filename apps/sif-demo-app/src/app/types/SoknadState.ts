import { RegistrertBarn, Søker } from '@sif/api';

import { Søknadsdata } from './Soknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}
