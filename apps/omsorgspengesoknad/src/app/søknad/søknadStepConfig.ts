import {
    SoknadApplicationType,
    SoknadStepsConfig,
    StepConfig,
} from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { StepId } from '../types/StepId';
import { SøkersRelasjonTilBarnet } from '../types/SøkersRelasjonTilBarnet';
import { OmBarnetSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

export const includeDeltBostedStep = (omBarnet?: OmBarnetSøknadsdata): boolean => {
    if (!omBarnet) {
        return false;
    }
    switch (omBarnet.type) {
        case 'registrertBarn':
            return omBarnet.sammeAdresse === false;
        case 'annetBarn':
            return (
                omBarnet.sammeAdresse === false ||
                omBarnet.søkersRelasjonTilBarnet === SøkersRelasjonTilBarnet.FOSTERFORELDER
            );
    }
};

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.OM_BARNET,
        StepId.LEGEERKLÆRING,
        ...(includeDeltBostedStep(søknadsdata?.omBarnet) ? [StepId.DELT_BOSTED] : []),
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
