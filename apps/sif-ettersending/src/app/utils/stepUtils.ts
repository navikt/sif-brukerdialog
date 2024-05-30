import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { StepID } from '../soknad/soknadStepsConfig';
import { SoknadFormData } from '../types/SoknadFormData';
import { Søknadstype } from '../types/Søknadstype';
import {
    beskrivelsePPStepIsValid,
    beskrivelseStepIsValid,
    documentsStepIsValid,
    welcomingPageIsValid,
} from '../validation/stepValidations';

export interface StepConfigItemTexts {
    pageTitle: string;
    stepTitle: string;
    stepIndicatorLabel: string;
    nextButtonLabel?: string;
    previousButtonLabel?: string;
}

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

export const documentsStepIsAvailable = (formData: SoknadFormData, søknadstype: Søknadstype) => {
    switch (søknadstype) {
        case Søknadstype.pleiepengerSyktBarn:
            return beskrivelsePPStepIsValid(formData);
        case Søknadstype.pleiepengerLivetsSluttfase:
            return beskrivelseStepIsValid(formData);
        default:
            return welcomingPageIsValid(formData);
    }
};

export const summaryStepAvailable = (formData: SoknadFormData) => documentsStepIsValid(formData);
