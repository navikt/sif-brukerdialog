import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { StepIndicatorStep } from './step-indicator/StepIndicator';
import { SoknadApplicationType, SoknadStepsConfig, StepConfig } from './soknadStepTypes';

interface StepTexts {
    pageTitle: string;
    stepTitle: string;
    nextButtonLabel: string;
    previousStepTitle?: string;
}

const getStepTexts = <Step>(intl: IntlShape, stepConfig: StepConfig<Step>): StepTexts => {
    return {
        pageTitle: intlHelper(intl, stepConfig.pageTitleIntlKey),
        stepTitle: intlHelper(intl, stepConfig.stepTitleIntlKey),
        nextButtonLabel: intlHelper(intl, stepConfig.nextButtonLabelIntlKey),
        previousStepTitle: stepConfig.previousStepTitleIntlKey
            ? intlHelper(intl, 'sif-common-soknad.tilbakeLenke', {
                  title: intlHelper(intl, stepConfig.previousStepTitleIntlKey),
              })
            : undefined,
    };
};

const getRootRoute = (applicationType: SoknadApplicationType): string => {
    return `/${applicationType}/`;
};

const getStepRoute = <STEPS, SøknadRoutes>(stepId: STEPS, applicationType: SoknadApplicationType): SøknadRoutes => {
    return applicationType
        ? (`${getRootRoute(applicationType)}${stepId}` as SøknadRoutes)
        : (`${stepId}` as SøknadRoutes);
};

const getStepsConfig = <STEPS extends string, SøknadRoutes>(
    steps: STEPS[],
    applicationType: SoknadApplicationType
): SoknadStepsConfig<STEPS, SøknadRoutes> => {
    const numSteps = steps.length;
    const config: SoknadStepsConfig<STEPS, SøknadRoutes> = {};
    let idx = 0;
    steps.forEach((stepId) => {
        const nextStep = idx < numSteps - 1 ? steps[idx + 1] : undefined;
        const nextStepRoute = nextStep ? getStepRoute<STEPS, SøknadRoutes>(nextStep, applicationType) : undefined;
        const prevStepId = idx > 0 ? steps[idx - 1] : undefined;

        config[stepId] = {
            id: stepId,
            pageTitleIntlKey: `step.${stepId}.pageTitle`,
            stepTitleIntlKey: `step.${stepId}.stepTitle`,
            nextButtonLabelIntlKey: `step.${stepId}.nextButtonLabel`,
            route: getStepRoute(stepId, applicationType),
            index: idx,
            backLinkHref: prevStepId ? getStepRoute(prevStepId, applicationType) : undefined,
            previousStepTitleIntlKey: prevStepId ? `step.${prevStepId}.pageTitle` : undefined,
            previousStep: prevStepId,
            nextStep,
            nextStepRoute,
        };
        idx++;
    });
    return config;
};

function getStepIndicatorStepsFromConfig<Steps, SøknadRoutes extends string>(
    stepsConfig: SoknadStepsConfig<Steps, SøknadRoutes>,
    intl: IntlShape
): StepIndicatorStep[] {
    return Object.keys(stepsConfig).map((key) => {
        const stepConfig = stepsConfig[key];
        const step: StepIndicatorStep = {
            id: stepConfig.id,
            index: stepConfig.index,
            label: intlHelper(intl, stepConfig.stepTitleIntlKey),
        };
        return step;
    });
}

const soknadStepUtils = {
    getStepTexts,
    getRootRoute,
    getStepRoute,
    getStepsConfig,
    getStepIndicatorStepsFromConfig,
};

export default soknadStepUtils;
