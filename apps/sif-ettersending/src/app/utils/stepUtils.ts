import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
// import { StepConfigInterface, StepConfigItemTexts } from '../config/stepConfig';
import { StepID } from '../soknad/soknadStepsConfig';
import { ApplicationType } from '../types/ApplicationType';
import { SoknadFormData } from '../types/SoknadFormData';
import { beskrivelseStepIsValid, documentsStepIsValid, welcomingPageIsValid } from '../validation/stepValidations';

export interface StepConfigItemTexts {
    pageTitle: string;
    stepTitle: string;
    stepIndicatorLabel: string;
    nextButtonLabel?: string;
    previousButtonLabel?: string;
}

// const getStepConfigItemTextKeys = (stepId: StepID): StepConfigItemTexts => {
//     return {
//         pageTitle: `step.${stepId}.pageTitle`,
//         stepTitle: `step.${stepId}.stepTitle`,
//         stepIndicatorLabel: `step.${stepId}.stepIndicatorLabel`,
//         nextButtonLabel: 'step.nextButtonLabel',
//         previousButtonLabel: 'step.previousButtonLabel',
//     };
// };

export interface StepItemConfigInterface extends StepConfigItemTexts {
    index: number;
    nextStep?: StepID;
    backLinkHref?: string;
    linkHref: string;
}

export interface StepConfigInterface {
    [key: string]: StepItemConfigInterface;
}

export const getStepTexts = (intl: IntlShape, stepId: StepID, stepConfig: StepConfigInterface): StepConfigItemTexts => {
    const conf = stepConfig[stepId];
    return {
        pageTitle: intlHelper(intl, conf.pageTitle),
        stepTitle: intlHelper(intl, conf.stepTitle),
        stepIndicatorLabel: intlHelper(intl, conf.stepIndicatorLabel),
        nextButtonLabel: conf.nextButtonLabel ? intlHelper(intl, conf.nextButtonLabel) : undefined,
        previousButtonLabel: conf.previousButtonLabel ? intlHelper(intl, conf.previousButtonLabel) : undefined,
    };
};
export const beskrivelseStepIsAvailable = (formData: SoknadFormData) => welcomingPageIsValid(formData);

export const omsTypeStepIsAvailable = (formData: SoknadFormData) => welcomingPageIsValid(formData);

export const documentsStepIsAvailable = (formData: SoknadFormData, søknadstype: ApplicationType) =>
    søknadstype === ApplicationType.pleiepengerBarn || søknadstype === ApplicationType.pleiepengerLivetsSluttfase
        ? beskrivelseStepIsValid(formData)
        : welcomingPageIsValid(formData);

export const summaryStepAvailable = (formData: SoknadFormData) => documentsStepIsValid(formData);
