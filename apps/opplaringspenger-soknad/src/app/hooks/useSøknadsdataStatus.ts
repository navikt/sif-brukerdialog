import { useState } from 'react';
import isEqual from 'react-fast-compare';
import { getMedlemskapSøknadsdataFromFormValues } from '@navikt/sif-common-forms-ds/src';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { ArbeidssituasjonFormValues } from '../søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { getArbeidssituasjonSøknadsdataFromFormValues } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonStepUtils';
import { KursFormValues } from '../søknad/steps/kurs/KursStep';
import { getKursSøknadsdataFromFormValues } from '../søknad/steps/kurs/kursStepUtils';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { getLegeerklæringSøknadsdataFromFormValues } from '../søknad/steps/legeerklæring/legeerklæringStepUtils';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { OmBarnetFormValues } from '../søknad/steps/om-barnet/OmBarnetStep';
import { getOmBarnetSøknadsdataFromFormValues } from '../søknad/steps/om-barnet/omBarnetStepUtils';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
import { SøknadContextState } from '../types/SøknadContextState';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

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
        case StepId.OM_BARNET:
            return getOmBarnetSøknadsdataFromFormValues(formValues as OmBarnetFormValues, [] as any /*todo*/);
        case StepId.KURS:
            return getKursSøknadsdataFromFormValues(formValues as KursFormValues);
        case StepId.LEGEERKLÆRING:
            return getLegeerklæringSøknadsdataFromFormValues(formValues as LegeerklæringFormValues);
        case StepId.ARBEIDSSITUASJON:
            return getArbeidssituasjonSøknadsdataFromFormValues(
                formValues as ArbeidssituasjonFormValues,
                state.søknadsdata.kurs?.søknadsperiode,
            );
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
