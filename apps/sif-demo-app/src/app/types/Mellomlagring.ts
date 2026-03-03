import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { Mellomlagring } from '../../rammeverk/types';
import { Søknadsdata } from './Søknadsdata';

/** App-specific mellomlagring med app-spesifikk Søknadsdata */
export type AppMellomlagring = Mellomlagring<Søknadsdata>;

/** App-specific metadata for hash validation */
export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
