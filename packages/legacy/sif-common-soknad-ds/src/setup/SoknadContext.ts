import { RemoteData } from '@devexperts/remote-data-ts';

import { SoknadStepsConfig } from '../modules/soknad-step/soknadStepTypes';

export interface SendSoknadStatusInterface<SoknadApiData> {
    failures: number;
    status: RemoteData<Error, SoknadApiData>;
}

export interface SoknadContextInterface<StepID, SoknadApiData> {
    soknadId: string | undefined;
    soknadStepsConfig: SoknadStepsConfig<StepID>;
    sendSoknadStatus: SendSoknadStatusInterface<SoknadApiData>;
    startSoknad: () => void;
    resetSendSøknadStatus: () => void;
    gotoNextStepFromStep: (stepId: StepID) => void;
    sendSoknad: (apiValues: SoknadApiData) => void;
    resetSoknad: () => void;
    continueSoknadLater?: (stepId: StepID) => void;
}
