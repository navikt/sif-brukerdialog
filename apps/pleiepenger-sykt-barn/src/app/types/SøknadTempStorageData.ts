import { ImportertSøknadMetadata } from './ImportertSøknad';
import { StepID } from './StepID';
import { SøknadFormValues } from './SøknadFormValues';

export const MELLOMLAGRING_VERSION = '13.4.0';

export interface MellomlagringMetadata {
    version: string;
    lastStepID?: StepID;
    updatedTimestemp: string;
    importertSøknadMetadata?: ImportertSøknadMetadata;
}

export interface SøknadTempStorageData {
    metadata: MellomlagringMetadata;
    formValues: SøknadFormValues;
}
