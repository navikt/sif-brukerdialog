import { useState } from 'react';
import isEqual from 'react-fast-compare';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { SoknadStepsConfig } from '@navikt/sif-common-soknad-ds';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { StepFormValues } from '../types/StepFormValues';
import { StepId } from '../types/StepId';
// import { SøknadContextState } from '../types/SøknadContextState';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getOpplysningerOmPleietrengendeSøknadsdataFromFormValues } from '../søknad/steps/opplysninger-om-pleietrengende/opplysningerOmPleietrengendeStepUtils';
import { OpplysningerOmPleietrengendeFormValues } from '../søknad/steps/opplysninger-om-pleietrengende/OpplysningerOmPleietrengendeStep';
import { LegeerklæringFormValues } from '../søknad/steps/legeerklæring/LegeerklæringForm';
import { getLegeerklæringSøknadsdataFromFormValues } from '../søknad/steps/legeerklæring/legeerklæringStepUtils';

import { TidsromFormValues } from '../søknad/steps/tidsrom/TidsromStep';
import { getArbeidssituasjonSøknadsdataFromFormValues } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonStepUtils';
import { ArbeidssituasjonFormValues } from '../søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';

import { ArbeidstidFormValues } from '../søknad/steps/arbeidstid/ArbeidstidStep';
import { MedlemskapFormValues } from '../søknad/steps/medlemskap/MedlemskapStep';
import { getMedlemskapSøknadsdataFromFormValues } from '../søknad/steps/medlemskap/medlemskapStepUtils';
import { getTidsromSøknadsdataFromFormValues } from '../søknad/steps/tidsrom/tidsromStepUtils';
import { getArbeidstidSøknadsdataFromFormValues } from '../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';

const getPrecedingSteps = (currentStepIndex: number, stepConfig: SoknadStepsConfig<StepId>): StepId[] => {
    return Object.keys(stepConfig).filter((_key, idx) => idx < currentStepIndex) as StepId[];
};

const getStepSøknadsdataFromStepFormValues = (
    step: StepId,
    stepFormValues: StepFormValues
    // state: SøknadContextState
) => {
    const formValues = stepFormValues[step];
    if (!formValues) {
        return undefined;
    }

    switch (step) {
        case StepId.OPPLYSNINGER_OM_PLEIETRENGENDE:
            return getOpplysningerOmPleietrengendeSøknadsdataFromFormValues(
                formValues as OpplysningerOmPleietrengendeFormValues
            );
        case StepId.LEGEERKLÆRING:
            return getLegeerklæringSøknadsdataFromFormValues(formValues as LegeerklæringFormValues);
        case StepId.TIDSROM:
            return getTidsromSøknadsdataFromFormValues(formValues as TidsromFormValues);
        case StepId.ARBEIDSSITUASJON:
            const periodeFra = datepickerUtils.getDateFromDateString((formValues as TidsromFormValues).periodeFra);
            const periodeTil = datepickerUtils.getDateFromDateString((formValues as TidsromFormValues).periodeTil);

            if (!periodeFra || !periodeTil) {
                return undefined;
            }

            const søknadsperiode: DateRange = { from: periodeFra, to: periodeTil };

            return getArbeidssituasjonSøknadsdataFromFormValues(
                formValues as ArbeidssituasjonFormValues,
                søknadsperiode,
                [] // TODO Vil gi feil
            );
        case StepId.ARBEIDSTID:
            return getArbeidstidSøknadsdataFromFormValues(formValues as ArbeidstidFormValues);
        case StepId.MEDLEMSKAP:
            return getMedlemskapSøknadsdataFromFormValues(formValues as MedlemskapFormValues);
    }
    return undefined;
};

export const isStepFormValuesAndStepSøknadsdataValid = (
    step: StepId,
    stepFormValues: StepFormValues,
    søknadsdata: Søknadsdata
    // state: SøknadContextState
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
