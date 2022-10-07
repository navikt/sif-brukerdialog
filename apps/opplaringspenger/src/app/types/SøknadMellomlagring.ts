import { SøknadStegID } from '../søknad/søknadStepsConfig';
import { Søknadsdata } from './Søknadsdata';

export const MELLOMLAGRING_VERSION = '0.0.1';

export interface MellomlagringMetadata {
    versjon: string;
    stegID?: SøknadStegID;
    updatedTimestemp: string;
    userHash: string;
}

export interface SøknadMellomlagring {
    metadata: MellomlagringMetadata;
    søknad: Søknadsdata;
}
