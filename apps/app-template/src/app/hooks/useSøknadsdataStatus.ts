import { useState } from 'react';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { StepId } from '../types/StepId';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((key, idx) => idx < currentStepIndex) as StepId[];
};

export const useSøknadsdataStatus = (stepId: StepId, stepConfig: SoknadStepsConfig<StepId>) => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const [invalidSteps, setInvalidSteps] = useState<StepId[]>([]);

    useEffectOnce(() => {
        const currentStep = stepConfig[stepId];
        const steps = getPrecedingSteps(currentStep.index, stepConfig);
        const stepsWithMissingSøknadsdata = steps.filter((step) => {
            return søknadsdata[step] === undefined;
        });
        setInvalidSteps(stepsWithMissingSøknadsdata);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
