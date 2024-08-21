import { useState } from 'react';
import isEqual from 'react-fast-compare';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { getLegeerklæringSøknadsdataFromFormValues } from '../søknad/steps/legeerklæring/legeerklæringStepUtils';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
import { SøknadContextState } from '../types/SøknadContextState';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getDineBarnSøknadsdataFromFormValues } from '../søknad/steps/dine-barn/dineBarnStepUtils';
import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { getFraværSøknadsdataFromFormValues } from '../søknad/steps/fravær/FraværStepUtils';
import { FraværFormValues } from '../søknad/steps/fravær/FraværStep';
import { getArbeidssituasjonSøknadsdataFromFormValues } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonStepUtils';
import { ArbeidssituasjonFormValues } from '../søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { getFraværFraSøknadsdataFromFormValues } from '../søknad/steps/fravær-fra/FraværFraUtils';
import { FraværFraFormValues } from '../søknad/steps/fravær-fra/FraværFraStep';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { getMedlemskapSøknadsdataFromFormValues } from '../søknad/steps/medlemskap/medlemskapStepUtils';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((_key, idx) => idx < currentStepIndex) as StepId[];
};

const getStepSøknadsdataFromStepFormValues = (
    step: StepId,
    stepFormValues: StepFormValues,
    state: SøknadContextState,
) => {
    const formValues = stepFormValues[step];
    if (!formValues) {
        return undefined;
    }

    switch (step) {
        case StepId.DINE_BARN:
            return getDineBarnSøknadsdataFromFormValues(formValues as DineBarnFormValues, state);
        case StepId.FRAVÆR:
            return getFraværSøknadsdataFromFormValues(formValues as FraværFormValues);
        case StepId.LEGEERKLÆRING:
            return getLegeerklæringSøknadsdataFromFormValues(formValues as LegeerklæringFormValues);
        case StepId.ARBEIDSSITUASJON:
            return getArbeidssituasjonSøknadsdataFromFormValues(formValues as ArbeidssituasjonFormValues);
        case StepId.FRAVÆR_FRA:
            return getFraværFraSøknadsdataFromFormValues(formValues as FraværFraFormValues);
        case StepId.MEDLEMSKAP:
            return getMedlemskapSøknadsdataFromFormValues(formValues as MedlemskapFormValues);
    }
    return undefined;
};

export const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata,
    state: SøknadContextState,
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
        const ip = <StepId[]>[];
        const precedingSteps = getPrecedingSteps(currentStep.index, stepConfig);

        precedingSteps.forEach((step) => {
            if (isStepFormValuesAndStepSøknadsdataValid(step, stepFormValues, søknadsdata, state) === false) {
                ip.push(step);
            }
        });

        setInvalidSteps(ip);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
