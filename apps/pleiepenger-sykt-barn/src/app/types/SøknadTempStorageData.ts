import { FeatureToggles } from '../utils/featureToggleUtils';
import { SøknadFormValues } from './søknad-form-values/SøknadFormValues';
import { StepID } from './StepID';

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
