import { useState } from 'react';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { StepId } from '../types/StepId';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { getSøknadsdateFromStepFormValues } from '../utils/stepFormValuesToSøknadsdata';
import isEqual from 'react-fast-compare';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((key, idx) => idx < currentStepIndex) as StepId[];
};

export const useSøknadsdataStatus = (stepId: StepId, stepConfig: SoknadStepsConfig<StepId>) => {
    const [invalidSteps, setInvalidSteps] = useState<StepId[]>([]);

    const {
        state: { søknadsdata },
    } = useSøknadContext();
    const { stepFormValues } = useStepFormValuesContext();

    useEffectOnce(() => {
        const currentStep = stepConfig[stepId];
        const iSteps = <StepId[]>[];
        getPrecedingSteps(currentStep.index, stepConfig)
            .filter((step) => {
                return stepFormValues[step] !== undefined;
            })
            .forEach((step) => {
                const stepSøknadsdata = søknadsdata[step];
                const tempSøknadsdata = getSøknadsdateFromStepFormValues[step](stepFormValues[step]);
                if (!stepSøknadsdata || !isEqual(tempSøknadsdata, stepSøknadsdata)) {
                    iSteps.push(step);
                }
            });
        setInvalidSteps(iSteps);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
