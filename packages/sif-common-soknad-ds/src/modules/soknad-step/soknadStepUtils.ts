import { IntlShape } from 'react-intl';
import { ProgressStep } from '@navikt/sif-common-core-ds/src/components/progress-stepper/ProgressStepper';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getSoknadIntl } from '../../hooks/useSoknadIntl';
import { SoknadApplicationType, SoknadStepsConfig, StepConfig } from './soknadStepTypes';

interface StepTexts {
    stepTitle: string;
    nextButtonLabel: string;
    previousButtonLabel?: string;
    previousStepTitle?: string;
}

const getStepTexts = <Step>(intl: IntlShape, stepConfig: StepConfig<Step>): StepTexts => {
    const { text } = getSoknadIntl(intl);
    return {
        stepTitle: intlHelper(intl, stepConfig.stepTitleIntlKey),
        nextButtonLabel: intlHelper(intl, stepConfig.nextButtonLabelIntlKey),
        previousStepTitle: stepConfig.previousStepTitleIntlKey
            ? text('scs.stepConfig.previousStepLinkText', {
                  title: intlHelper(intl, stepConfig.previousStepTitleIntlKey),
              })
            : undefined,
    };
};

const getRootRoute = (applicationType: SoknadApplicationType): string => {
    return `/${applicationType}/`;
};

const getStepRoute = <STEPS>(stepId: STEPS, applicationType: SoknadApplicationType): string => {
    return applicationType ? `${getRootRoute(applicationType)}${stepId}` : `${stepId}`;
};

const getStepsConfig = <STEPS extends string>(
    steps: STEPS[],
    applicationType: SoknadApplicationType,
    routeCreator?: (step: STEPS) => string,
): SoknadStepsConfig<STEPS> => {
    const numSteps = steps.length;
    const config: SoknadStepsConfig<STEPS> = {};
    let idx = 0;
    steps.forEach((stepId) => {
        const nextStep = idx < numSteps - 1 ? steps[idx + 1] : undefined;
        const prevStepId = idx > 0 ? steps[idx - 1] : undefined;
        config[stepId] = {
            id: stepId,
            stepTitleIntlKey: `step.${stepId}.stepTitle`,
            nextButtonLabelIntlKey: `step.${stepId}.nextButtonLabel`,
            route: routeCreator ? routeCreator(stepId) : getStepRoute(stepId, applicationType),
            index: idx,
            backLinkHref: prevStepId ? getStepRoute(prevStepId, applicationType) : undefined,
            previousButtonLabelIntlKey: `step.previousButtonLabel`,
            previousStep: prevStepId,
            previousStepRoute: prevStepId
                ? routeCreator
                    ? routeCreator(prevStepId)
                    : getStepRoute<STEPS>(prevStepId, applicationType)
                : undefined,
            previousStepTitleIntlKey: prevStepId ? `step.${prevStepId}.pageTitle` : undefined,
            nextStep,
            nextStepRoute: nextStep
                ? routeCreator
                    ? routeCreator(nextStep)
                    : getStepRoute<STEPS>(nextStep, applicationType)
                : undefined,
        };
        idx++;
    });
    return config;
};

function getProgressStepsFromConfig<Steps>(
    stepsConfig: SoknadStepsConfig<Steps>,
    currentStepIndex: number,
    intl: IntlShape,
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
