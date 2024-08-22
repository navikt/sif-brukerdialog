import { useState } from 'react';
import isEqual from 'react-fast-compare';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getOmOmsorgenForBarnSøknadsdataFromFormValues } from '../søknad/steps/om-omsorgen-for-barn/omOmsorgenForBarnStepUtils';
import { getTidspunktForAleneomsorgSøknadsdataFromFormValues } from '../søknad/steps/tidspunkt-for-aleneomsorg/tidspunktForAleneomsorgStepUtils';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { OmOmsorgenForBarnFormValues } from '../søknad/steps/om-omsorgen-for-barn/OmOmsorgenForBarnStep';
import { TidspunktForAleneomsorgFormValues } from '../søknad/steps/tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((_key, idx) => idx < currentStepIndex) as StepId[];
};

const getStepSøknadsdataFromStepFormValues = (
    step: StepId,
    stepFormValues: StepFormValues,
    registrertBarn: RegistrertBarn[],
) => {
    const formValues = stepFormValues[step];
    if (!formValues) {
        return undefined;
    }
    switch (step) {
        case StepId.OM_OMSORGEN_FOR_BARN:
            return getOmOmsorgenForBarnSøknadsdataFromFormValues(
                formValues as OmOmsorgenForBarnFormValues,
                registrertBarn,
            );
        case StepId.TIDSPUNKT_FOR_ALENEOMSORG:
            return getTidspunktForAleneomsorgSøknadsdataFromFormValues(formValues as TidspunktForAleneomsorgFormValues);
    }
    return undefined;
};

export const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata,
    registrertBarn: RegistrertBarn[],
): boolean => {
    if (stepFormValues[step]) {
        const stepSøknadsdata = søknadsdata[step];
        const tempSøknadsdata = getStepSøknadsdataFromStepFormValues(step, stepFormValues, registrertBarn);
        if (!stepSøknadsdata || !isEqual(tempSøknadsdata, stepSøknadsdata)) {
            return false;
        }
    }
    return true;
};

export const useSøknadsdataStatus = (stepId: StepId, stepConfig: SoknadStepsConfig<StepId>) => {
    const [invalidSteps, setInvalidSteps] = useState<StepId[]>([]);

    const {
        state: { søknadsdata, registrertBarn },
    } = useSøknadContext();

    const { stepFormValues } = useStepFormValuesContext();

    useEffectOnce(() => {
        const currentStep = stepConfig[stepId];
        const ip = <StepId[]>[];
        const precedingSteps = getPrecedingSteps(currentStep.index, stepConfig);

        precedingSteps.forEach((step) => {
            if (isStepFormValuesAndStepSøknadsdataValid(step, stepFormValues, søknadsdata, registrertBarn) === false) {
                ip.push(step);
            }
        });

        setInvalidSteps(ip);
    });

    return { invalidSteps, hasInvalidSteps: invalidSteps.length > 0 };
};
