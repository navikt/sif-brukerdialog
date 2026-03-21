import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { KontoInfo } from './KontoInfo';
import { Søknadsdata } from './Søknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    kontoInfo: KontoInfo;
    søknadsdata: Søknadsdata;
}
