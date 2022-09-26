import { StepID } from '../søknad/søknadStepsConfig';
import { SøknadFormValues } from './SøknadFormValues';

export const MELLOMLAGRING_VERSION = '0.0.1';

export interface MellomlagringMetadata {
    versjon: string;
    lastStepID?: StepID;
    updatedTimestemp: string;
    userHash: string;
}

export interface SøknadMellomlagring {
    metadata: MellomlagringMetadata;
    formValues: SøknadFormValues;
}
