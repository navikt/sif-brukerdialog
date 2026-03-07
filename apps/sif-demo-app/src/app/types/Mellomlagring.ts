import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { SøknadFormValues } from '@rammeverk/consistency';
import { Mellomlagring } from '@rammeverk/types';

import { Søknadsdata } from './Søknadsdata';

/** Søknad-specific mellomlagring med Søknadsdata og StepsFormValues */
export type SøknadMellomlagring = Mellomlagring<Søknadsdata, SøknadFormValues>;

/** Søknad-specific metadata for hash validation */
export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
