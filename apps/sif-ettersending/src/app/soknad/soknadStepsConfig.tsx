import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { Søknadstype } from '../types/Søknadstype';
import { getApplicationPageRoute } from '../utils/routeUtils';

export enum StepID {
    'BESKRIVELSE' = 'beskrivelse',
    'DOKUMENT_TYPE' = 'dokumentType',
    'DOKUMENTER' = 'dokumenter',
    'OPPSUMMERING' = 'oppsummering',
    'OMS_TYPE' = 'omsorgspenger_type',
}

interface ConfigStepHelperType {
    stepID: StepID;
    included: boolean;
}

export const getFirstStep = (applicationType: Søknadstype): StepID => {
    switch (applicationType) {
        case Søknadstype.pleiepengerSyktBarn:
            return StepID.DOKUMENT_TYPE;
        case Søknadstype.pleiepengerLivetsSluttfase:
            return StepID.BESKRIVELSE;
        case Søknadstype.omsorgspenger:
            return StepID.OMS_TYPE;
        default:
            return StepID.DOKUMENTER;
    }
};

const getSoknadSteps = (søknadstype: Søknadstype): StepID[] => {
    const visBeskrivelseStep = søknadstype === Søknadstype.pleiepengerLivetsSluttfase;
    const visDokumentTypeStep = søknadstype === Søknadstype.pleiepengerSyktBarn;
    const visOmsTypeStep = søknadstype === Søknadstype.omsorgspenger;

    const allSteps: ConfigStepHelperType[] = [
        { stepID: StepID.BESKRIVELSE, included: visBeskrivelseStep },
        { stepID: StepID.DOKUMENT_TYPE, included: visDokumentTypeStep },
        { stepID: StepID.OMS_TYPE, included: visOmsTypeStep },
        { stepID: StepID.DOKUMENTER, included: true },
        { stepID: StepID.OPPSUMMERING, included: true },
    ];

    const steps: StepID[] = allSteps.filter((step) => step.included === true).map((step) => step.stepID);

    return steps;
};

export const getSoknadStepsConfig = (søknadstype: Søknadstype): SoknadStepsConfig<StepID> => {
    const søknadStepConfig = soknadStepUtils.getStepsConfig(getSoknadSteps(søknadstype), SoknadApplicationType.MELDING);
    const updatedConfig: SoknadStepsConfig<StepID> = {};

    /** Oppdatere routes med søknadstype */
    Object.keys(søknadStepConfig).forEach((key: StepID) => {
        const config = søknadStepConfig[key] as StepConfig<StepID>;
        updatedConfig[config.id] = {
            ...config,
            route: getApplicationPageRoute(søknadstype, config.id),
            previousStepRoute: config.previousStep
                ? getApplicationPageRoute(søknadstype, config.previousStep)
                : undefined,
            nextStepRoute: config.nextStep ? getApplicationPageRoute(søknadstype, config.nextStep) : undefined,
        };
    });

    return updatedConfig;
};
