import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { Mellomlagring } from '../../rammeverk/types';
import { SøknadStepId } from '../config/søknadStepConfig';
import { Søknadsdata } from './Søknadsdata';

/** App-specific mellomlagring med app-spesifikk Søknadsdata og skjemadata */
export interface AppMellomlagring extends Mellomlagring<Søknadsdata> {
    skjemadata?: Partial<Record<SøknadStepId, object>>;
}

/** App-specific metadata for hash validation */
export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
