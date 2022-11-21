import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { ApplicationType } from '../types/ApplicationType';
import { StepID } from '../config/stepConfig';

interface ConfigStepHelperType {
    stepID: StepID;
    included: boolean;
}

const getSoknadSteps = (søknadstype: ApplicationType): StepID[] => {
    const visBeskrivelseStep =
        søknadstype === ApplicationType.pleiepengerBarn || søknadstype === ApplicationType.pleiepengerLivetsSluttfase;
    const visOmsTypeStep = søknadstype === ApplicationType.omsorgspenger;

    const allSteps: ConfigStepHelperType[] = [
        { stepID: StepID.BESKRIVELSE, included: visBeskrivelseStep },
        { stepID: StepID.OMS_TYPE, included: visOmsTypeStep },
        { stepID: StepID.DOKUMENTER, included: true },
        { stepID: StepID.OPPSUMMERING, included: true },
    ];

    const steps: StepID[] = allSteps.filter((step) => step.included === true).map((step) => step.stepID);

    return steps;
};

export const getSoknadStepsConfig = (søknadstype: ApplicationType): SoknadStepsConfig<StepID> =>
    soknadStepUtils.getStepsConfig(getSoknadSteps(søknadstype), SoknadApplicationType.MELDING);
