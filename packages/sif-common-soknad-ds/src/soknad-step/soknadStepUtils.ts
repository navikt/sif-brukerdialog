import { IntlShape } from 'react-intl';
import { ProgressStep } from '@navikt/sif-common-core-ds/lib/components/progress-stepper/ProgressStepper';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { SoknadApplicationType, SoknadStepsConfig, StepConfig } from './soknadStepTypes';

interface StepTexts {
    pageTitle: string;
    stepTitle: string;
    nextButtonLabel: string;
    previousButtonLabel?: string;
    previousStepTitle?: string;
}

const getStepTexts = <Step>(intl: IntlShape, stepConfig: StepConfig<Step>): StepTexts => {
    return {
        pageTitle: intlHelper(intl, stepConfig.pageTitleIntlKey),
        stepTitle: intlHelper(intl, stepConfig.stepTitleIntlKey),
        nextButtonLabel: intlHelper(intl, stepConfig.nextButtonLabelIntlKey),
        // previousButtonLabel: intlHelper(intl, stepConfig.previousButtonLabelIntlKey),
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
        const prevStepId = idx > 0 ? steps[idx - 1] : undefined;
        config[stepId] = {
            id: stepId,
            pageTitleIntlKey: `step.${stepId}.pageTitle`,
            stepTitleIntlKey: `step.${stepId}.stepTitle`,
            nextButtonLabelIntlKey: `step.${stepId}.nextButtonLabel`,
            route: getStepRoute(stepId, applicationType),
            index: idx,
            backLinkHref: prevStepId ? getStepRoute(prevStepId, applicationType) : undefined,
            previousButtonLabelIntlKey: `step.previousButtonLabel`,
            previousStep: prevStepId,
            previousStepRoute: prevStepId ? getStepRoute<STEPS, SøknadRoutes>(prevStepId, applicationType) : undefined,
            previousStepTitleIntlKey: prevStepId ? `step.${prevStepId}.pageTitle` : undefined,
            nextStep,
            nextStepRoute: nextStep ? getStepRoute<STEPS, SøknadRoutes>(nextStep, applicationType) : undefined,
        };
        idx++;
    });
    return config;
};

function getProgressStepsFromConfig<Steps, SøknadRoutes extends string>(
    stepsConfig: SoknadStepsConfig<Steps, SøknadRoutes>,
    currentStepIndex: number,
    intl: IntlShape
): ProgressStep[] {
    return Object.keys(stepsConfig).map((key) => {
        const stepConfig = stepsConfig[key];
        const step: ProgressStep = {
            id: stepConfig.id,
            index: stepConfig.index,
            label: intlHelper(intl, stepConfig.stepTitleIntlKey),
            href: stepConfig.route,
            completed: stepConfig.index < currentStepIndex,
        };
        return step;
    });
}

const soknadStepUtils = {
    getStepTexts,
    getRootRoute,
    getStepRoute,
    getStepsConfig,
    getProgressStepsFromConfig,
};

export default soknadStepUtils;
