import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';

export enum StepID {
    'BARN' = 'barn',
    'ARBEID' = 'arbeid',
    'OPPSUMMERING' = 'oppsummering',
}

const getSoknadSteps = (): StepID[] => {
    return [StepID.BARN, StepID.ARBEID, StepID.OPPSUMMERING];
};

export const getSoknadStepsConfig = (): SoknadStepsConfig<StepID> =>
    soknadStepUtils.getStepsConfig(getSoknadSteps(), SoknadApplicationType.MELDING);
