import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { Mellomlagring, SøknadFormValues } from '@sif/soknad/types';

import { Søknadsdata } from './Søknadsdata';

export type SøknadMellomlagring = Mellomlagring<Søknadsdata, SøknadFormValues>;

export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
