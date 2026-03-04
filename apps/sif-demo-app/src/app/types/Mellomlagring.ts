import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { Mellomlagring } from '../../rammeverk/types';
import { SøknadStepId } from '../config/søknadStepConfig';
import { Søknadsdata } from './Søknadsdata';

/** Søknad-specific mellomlagring med Søknadsdata og skjemadata */
export interface SøknadMellomlagring extends Mellomlagring<Søknadsdata> {
    skjemadata?: Partial<Record<SøknadStepId, object>>;
}

/** Søknad-specific metadata for hash validation */
export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
