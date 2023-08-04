import { StepID } from './_StepID';
import { SøknadFormValues } from './_SøknadFormValues';

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
