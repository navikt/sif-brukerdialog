import { useState } from 'react';
import isEqual from 'react-fast-compare';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getOmAnnenForelderSøknadsdataFromFormValues } from '../søknad/steps/om-annen-forelder/omAnnenForelderStepUtils';
import { getAnnenForelderenSituasjonSøknadsdataFromFormValues } from '../søknad/steps/annen-forelderens-situasjon/annenForelderenSituasjonStepUtils';
import { getOmBarnaSøknadsdataFromFormValues } from '../søknad/steps/om-barna/OmBarnaStepUtils';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((key, idx) => idx < currentStepIndex) as StepId[];
};

const getStepSøknadsdataFromStepFormValues = (step: StepId, stepFormValues: StepFormValues) => {
    const formValues = stepFormValues[step];
    if (!formValues) {
        return undefined;
    }
    switch (step) {
        case StepId.OM_ANNEN_FORELDER:
            return getOmAnnenForelderSøknadsdataFromFormValues(formValues);
        case StepId.ANNEN_FORELDER_SITUASJON:
            return getAnnenForelderenSituasjonSøknadsdataFromFormValues(formValues);
        case StepId.OM_BARNA:
            return getOmBarnaSøknadsdataFromFormValues(formValues);
    }
    return undefined;
};

export const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata
): boolean => {
    if (stepFormValues[step]) {
        const stepSøknadsdata = søknadsdata[step];
        const tempSøknadsdata = getStepSøknadsdataFromStepFormValues(step, stepFormValues);
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
            if (isStepFormValuesAndStepSøknadsdataValid(step, stepFormValues, søknadsdata) === false) {
                invalidSteps.push(step);
            }
        });

        setInvalidSteps(invalidSteps);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
