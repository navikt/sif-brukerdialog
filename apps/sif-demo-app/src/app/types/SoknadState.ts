import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';

import { Søknadsdata } from './Soknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}
