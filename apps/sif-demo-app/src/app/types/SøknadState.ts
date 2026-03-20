import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { Søknadsdata } from './Søknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}
