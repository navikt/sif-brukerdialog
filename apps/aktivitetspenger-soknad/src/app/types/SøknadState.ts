import { RegistrertBarn, Søker, UtvidetKontonummerInfo } from '@sif/api';

import { Søknadsdata } from './Søknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    kontoInfo: UtvidetKontonummerInfo;
    søknadsdata: Søknadsdata;
}
