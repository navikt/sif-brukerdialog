import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { Mellomlagring } from '@rammeverk/types';
// import { SøknadStepId } from '../config/søknadStepConfig';
import { Søknadsdata } from './Søknadsdata';

export type SøknadSkjemadata = Partial<Record<string, object>>;

/** Søknad-specific mellomlagring med Søknadsdata og skjemadata */
export type SøknadMellomlagring = Mellomlagring<Søknadsdata, SøknadSkjemadata>;

/** Søknad-specific metadata for hash validation */
export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
