import { FeatureToggles } from '../utils/featureToggleUtils';
import { StepID } from './StepID';
import { SøknadFormValues } from './søknad-form-values/SøknadFormValues';

export const MELLOMLAGRING_VERSION = '14.2.0';

export interface MellomlagringMetadata {
    version: string;
    lastStepID?: StepID;
    updatedTimestemp: string;
    featureToggles: FeatureToggles;
}

export interface SøknadTempStorageData {
    metadata: MellomlagringMetadata;
    formValues: SøknadFormValues;
}
