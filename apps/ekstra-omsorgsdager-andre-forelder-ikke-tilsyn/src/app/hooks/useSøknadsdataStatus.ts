import { useState } from 'react';
import isEqual from 'react-fast-compare';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { AnnenForelderenSituasjonFormValues } from '../søknad/steps/annen-forelderens-situasjon/AnnenForelderenSituasjonStep';
import { getAnnenForelderenSituasjonSøknadsdataFromFormValues } from '../søknad/steps/annen-forelderens-situasjon/annenForelderenSituasjonStepUtils';
import { OmAnnenForelderFormValues } from '../søknad/steps/om-annen-forelder/OmAnnenForelderStep';
import { getOmAnnenForelderSøknadsdataFromFormValues } from '../søknad/steps/om-annen-forelder/omAnnenForelderStepUtils';
import { OmBarnaFormValues } from '../søknad/steps/om-barna/OmBarnaStep';
import { getOmBarnaSøknadsdataFromFormValues } from '../søknad/steps/om-barna/OmBarnaStepUtils';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((_key, idx) => idx < currentStepIndex) as StepId[];
};

const getStepSøknadsdataFromStepFormValues = (step: StepId, stepFormValues: StepFormValues) => {
    const formValues = stepFormValues[step];
    if (!formValues) {
        return undefined;
    }
    switch (step) {
        case StepId.OM_ANNEN_FORELDER:
            return getOmAnnenForelderSøknadsdataFromFormValues(formValues as OmAnnenForelderFormValues);
        case StepId.ANNEN_FORELDER_SITUASJON:
            return getAnnenForelderenSituasjonSøknadsdataFromFormValues(
                formValues as AnnenForelderenSituasjonFormValues,
            );
        case StepId.OM_BARNA:
            return getOmBarnaSøknadsdataFromFormValues(formValues as OmBarnaFormValues);
    }
    return undefined;
};

export const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata,
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
        const ip = <StepId[]>[];
        const precedingSteps = getPrecedingSteps(currentStep.index, stepConfig);

        precedingSteps.forEach((step) => {
            if (isStepFormValuesAndStepSøknadsdataValid(step, stepFormValues, søknadsdata) === false) {
                ip.push(step);
            }
        });

        setInvalidSteps(ip);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
