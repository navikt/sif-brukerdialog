import { RegistrertBarn, Søker } from '@sif/api';
import { Mellomlagring, SøknadFormValues } from '@sif/soknad/types';

import { Søknadsdata } from './Soknadsdata';

/** Søknad-specific mellomlagring med Søknadsdata og StepsFormValues */
export type SøknadMellomlagring = Mellomlagring<Søknadsdata, SøknadFormValues>;

/** Søknad-specific metadata for hash validation */
export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
