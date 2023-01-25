import { useState } from 'react';
import isEqual from 'react-fast-compare';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadsdateFromStepFormValues } from '../utils/stepFormValuesToSøknadsdata';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((key, idx) => idx < currentStepIndex) as StepId[];
};

export const isSøknadsdataStepValid = (step: StepId, søknadsdata: Søknadsdata): boolean => {
    switch (step) {
        case StepId.DELT_BOSTED:
            return (søknadsdata.deltBosted?.vedlegg || []).length > 0;
        default:
            return true;
    }
};

export const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata
): boolean => {
    if (stepFormValues[step]) {
        const stepSøknadsdata = søknadsdata[step];
        if (!getSøknadsdateFromStepFormValues[step]) {
            throw new Error(`Missing getSøknadsdateFromStepFormValues for step [${step}]`);
        }
        const tempSøknadsdata = getSøknadsdateFromStepFormValues[step](stepFormValues[step]);
        if (!stepSøknadsdata || !isEqual(tempSøknadsdata, stepSøknadsdata)) {
            return false;
        }
    }
    return true;
};

export const useSøknadsdataStatus = (stepId: StepId, stepConfig: SoknadStepsConfig<StepId>) => {
    const [invalidSteps, setInvalidSteps] = useState<StepId[]>([]);

    const { state } = useSøknadContext();
    const { søknadsdata } = state;
    const { stepFormValues } = useStepFormValuesContext();

    useEffectOnce(() => {
        const currentStep = stepConfig[stepId];
        const invalidSteps = <StepId[]>[];
        const precedingSteps = getPrecedingSteps(currentStep.index, stepConfig);

        precedingSteps.forEach((step) => {
            if (
                isStepFormValuesAndStepSøknadsdataValid(step, stepFormValues, søknadsdata) === false ||
                isSøknadsdataStepValid(step, søknadsdata) === false
            ) {
                invalidSteps.push(step);
            }
        });

        setInvalidSteps(invalidSteps);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
