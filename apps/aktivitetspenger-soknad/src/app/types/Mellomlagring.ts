import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { Mellomlagring, SøknadFormValues } from '@sif/soknad/types';

import { Søknadsdata } from './Soknadsdata';

export type SøknadMellomlagring = Mellomlagring<Søknadsdata, SøknadFormValues>;

export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
