import { StepID } from '../søknad/søknadStepsConfig';
import { ImportertSøknadMetadata } from './ImportertSøknad';
import { SøknadFormValues } from './SøknadFormValues';

export const MELLOMLAGRING_VERSION = '13.3.0';

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
