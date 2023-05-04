import { useState } from 'react';
import isEqual from 'react-fast-compare';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { StepFormValues } from '../søknad/config/StepFormValues';
import { StepId } from '../søknad/config/StepId';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { getArbeidssituasjonSøknadsdataFromFormValues } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonStepUtils';
import { getArbeidstidSøknadsdataFromFormValues } from '../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { getLovbestemtFerieSøknadsdataFromFormValues } from '../søknad/steps/lovbestemt-ferie/lovbestemtFerieStepUtils';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { Arbeidsgiver } from '../types/Arbeidsgiver';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((_key, idx) => idx < currentStepIndex) as StepId[];
};

const getStepSøknadsdataFromStepFormValues = (
    step: StepId,
    stepFormValues: StepFormValues,
    arbeidsgivere: Arbeidsgiver[]
) => {
    const formValues = stepFormValues[step];
    if (!formValues) {
        return undefined;
    }
    switch (step) {
        case StepId.ARBEIDSSITUASJON:
            return getArbeidssituasjonSøknadsdataFromFormValues(formValues as any, arbeidsgivere);
        case StepId.LOVBESTEMT_FERIE:
            return getLovbestemtFerieSøknadsdataFromFormValues(formValues as any);
        case StepId.ARBEIDSTID:
            return getArbeidstidSøknadsdataFromFormValues(formValues as any);
    }
    return undefined;
};

const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata,
    arbeidsgivere: Arbeidsgiver[]
): boolean => {
    if (stepFormValues[step]) {
        const stepSøknadsdata = søknadsdata[step];
        const tempSøknadsdata = getStepSøknadsdataFromStepFormValues(step, stepFormValues, arbeidsgivere);
        if (!stepSøknadsdata || !isEqual(tempSøknadsdata, stepSøknadsdata)) {
            return false;
        }
    }
    return true;
};

export const useSøknadsdataStatus = (
    stepId: StepId,
    stepConfig: SoknadStepsConfig<StepId>,
    arbeidsgivere: Arbeidsgiver[]
) => {
    const [invalidSteps, setInvalidSteps] = useState<StepId[]>([]);

    const {
        state: { søknadsdata },
    } = useSøknadContext();
    const { stepFormValues } = useStepFormValuesContext();

    /** Går gjennom og sjekker at søknadsdata stemmer overens med skjemadata */
    useEffectOnce(() => {
        const currentStep = stepConfig[stepId];
        const iSteps = <StepId[]>[];
        getPrecedingSteps(currentStep.index, stepConfig).forEach((step) => {
            if (isStepFormValuesAndStepSøknadsdataValid(step, stepFormValues, søknadsdata, arbeidsgivere) === false) {
                iSteps.push(step);
            }
        });
        setInvalidSteps(iSteps);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
