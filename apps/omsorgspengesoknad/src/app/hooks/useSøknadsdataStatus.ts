import { useState } from 'react';
import isEqual from 'react-fast-compare';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { getDeltBostedSøknadsdataFromFormValues } from '../søknad/steps/delt-bosted/deltBostedStepUtils';
import { getLegeerklæringSøknadsdataFromFormValues } from '../søknad/steps/legeerklæring/legeerklæringStepUtils';
import { getOmBarnetSøknadsdataFromFormValues } from '../søknad/steps/om-barnet/omBarnetStepUtils';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
import { SøknadContextState } from '../types/SøknadContextState';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { OmBarnetFormValues } from '../søknad/steps/om-barnet/OmBarnetStep';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { DeltBostedFormValues } from '../søknad/steps/delt-bosted/DeltBostedForm';

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

const getStepSøknadsdataFromStepFormValues = (
    step: StepId,
    stepFormValues: StepFormValues,
    state: SøknadContextState
) => {
    const formValues = stepFormValues[step];
    if (!formValues) {
        return undefined;
    }
    switch (step) {
        case StepId.OM_BARNET:
            return getOmBarnetSøknadsdataFromFormValues(formValues as OmBarnetFormValues, state);
        case StepId.LEGEERKLÆRING:
            return getLegeerklæringSøknadsdataFromFormValues(formValues as LegeerklæringFormValues);
        case StepId.DELT_BOSTED:
            return getDeltBostedSøknadsdataFromFormValues(formValues as DeltBostedFormValues);
    }
    return undefined;
};

export const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata,
    state: SøknadContextState
): boolean => {
    if (stepFormValues[step]) {
        const stepSøknadsdata = søknadsdata[step];
        const tempSøknadsdata = getStepSøknadsdataFromStepFormValues(step, stepFormValues, state);
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
                isStepFormValuesAndStepSøknadsdataValid(step, stepFormValues, søknadsdata, state) === false ||
                isSøknadsdataStepValid(step, søknadsdata) === false
            ) {
                invalidSteps.push(step);
            }
        });

        setInvalidSteps(invalidSteps);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
