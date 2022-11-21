import { StepID } from '../soknad/soknadStepsConfig';
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
