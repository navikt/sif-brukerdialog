import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { KontoInfo } from './KontoInfo';
import { Søknadsdata } from './Søknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummer: KontoInfo;
    søknadsdata: Søknadsdata;
}
