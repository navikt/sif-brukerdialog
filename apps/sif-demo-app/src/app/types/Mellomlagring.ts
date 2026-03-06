import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { StepsFormValues } from '@rammeverk/state/StepFormValuesContext';
import { Mellomlagring } from '@rammeverk/types';

import { Søknadsdata } from './Søknadsdata';

/** Søknad-specific mellomlagring med Søknadsdata og StepsFormValues */
export type SøknadMellomlagring = Mellomlagring<Søknadsdata, StepsFormValues>;

/** Søknad-specific metadata for hash validation */
export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
