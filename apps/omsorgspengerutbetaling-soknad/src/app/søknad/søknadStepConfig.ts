import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';

import { ArbeidSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { StepId } from '../types/StepId';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

export const includeFraværFraStep = (arbeidssituasjon?: ArbeidSøknadsdata): boolean => {
    if (!arbeidssituasjon) {
        return false;
    }

    const { frilans, selvstendig } = arbeidssituasjon;

    if (!frilans || !selvstendig) {
        return false;
    }

    const erFrilanser = frilans.type === 'pågående' || frilans.type === 'sluttetISøknadsperiode';
    const erSelvstendigNæringsdrivende = selvstendig.type === 'erSN';

    return erFrilanser && erSelvstendigNæringsdrivende;
};

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.DINE_BARN,
        StepId.FRAVÆR,
        StepId.LEGEERKLÆRING,
        StepId.ARBEIDSSITUASJON,
        ...(includeFraværFraStep(søknadsdata?.arbeidssituasjon) ? [StepId.FRAVÆR_FRA] : []),
        StepId.MEDLEMSKAP,
        StepId.OPPSUMMERING,
    ];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD, (step) => {
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (søknadsdata: Søknadsdata, stepId: StepId): StepConfig<StepId> => {
    const config = getSøknadStepConfig(søknadsdata)[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};
