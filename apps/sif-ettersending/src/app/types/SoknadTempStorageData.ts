import { StepID } from '../config/stepConfig';
import { SoknadFormData } from './SoknadFormData';

export interface SoknadTempStorageData {
    metadata: {
        soknadId: string;
        lastStepID: StepID;
        version: string;
        userHash: string;
    };
    formData: SoknadFormData;
}
