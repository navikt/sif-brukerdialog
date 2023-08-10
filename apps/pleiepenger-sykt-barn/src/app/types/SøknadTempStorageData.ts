import { StepID } from './StepID';
import { SøknadFormValues } from './søknad-form-values/SøknadFormValues';

export const MELLOMLAGRING_VERSION = '13.5.0';

export interface MellomlagringMetadata {
    version: string;
    lastStepID?: StepID;
    updatedTimestemp: string;
}

export interface SøknadTempStorageData {
    metadata: MellomlagringMetadata;
    formValues: SøknadFormValues;
}
