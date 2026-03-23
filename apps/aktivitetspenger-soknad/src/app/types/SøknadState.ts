import { RegistrertBarn, Søker } from '@sif/api';

import { KontoInfo } from './KontoInfo';
import { Søknadsdata } from './Søknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    kontoInfo: KontoInfo;
    søknadsdata: Søknadsdata;
}
