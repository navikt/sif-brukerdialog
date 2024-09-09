import { useState } from 'react';
import isEqual from 'react-fast-compare';
import { getMedlemskapSøknadsdataFromFormValues, MedlemskapFormValues } from '@navikt/sif-common-forms-ds';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { getDineBarnSøknadsdataFromFormValues } from '../søknad/steps/dine-barn/dineBarnStepUtils';
import { FraværStepFormValues } from '../søknad/steps/fravær/FraværStep';
import { getFraværSøknadsdataFromFormValues } from '../søknad/steps/fravær/fraværStepUtils';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { getLegeerklæringSøknadsdataFromFormValues } from '../søknad/steps/legeerklæring/legeerklæringStepUtils';
import { SituasjonFormValues } from '../søknad/steps/situasjon/SituasjonStep';
import { getSituasjonSøknadsdataFromFormValues } from '../søknad/steps/situasjon/SituasjonStepUtils';
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
        case StepId.DINE_BARN:
            return getDineBarnSøknadsdataFromFormValues(formValues as DineBarnFormValues);
        case StepId.SITUASJON:
            return getSituasjonSøknadsdataFromFormValues(formValues as SituasjonFormValues);
        case StepId.FRAVÆR:
            return getFraværSøknadsdataFromFormValues(formValues as FraværStepFormValues);
        case StepId.LEGEERKLÆRING:
            return getLegeerklæringSøknadsdataFromFormValues(formValues as LegeerklæringFormValues);
        case StepId.MEDLEMSKAP:
            return getMedlemskapSøknadsdataFromFormValues(formValues as MedlemskapFormValues);
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
