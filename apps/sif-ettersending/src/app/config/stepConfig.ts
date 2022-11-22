import { ApplicationType } from '../types/ApplicationType';
import { getApplicationPageRoute } from '../utils/routeUtils';
import { WELCOME_PAGE } from './routeConfig';

export enum StepID {
    'BESKRIVELSE' = 'beskrivelse',
    'DOKUMENTER' = 'dokumenter',
    'OPPSUMMERING' = 'oppsummering',
    'OMS_TYPE' = 'omsorgspenger_type',
}

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

const getStepConfigItemTextKeys = (stepId: StepID): StepConfigItemTexts => {
    return {
        pageTitle: `step.${stepId}.pageTitle`,
        stepTitle: `step.${stepId}.stepTitle`,
        stepIndicatorLabel: `step.${stepId}.stepIndicatorLabel`,
        nextButtonLabel: 'step.nextButtonLabel',
        previousButtonLabel: 'step.previousButtonLabel',
    };
};

export const getFirstStep = (applicationType: ApplicationType): StepID => {
    switch (applicationType) {
        case ApplicationType.pleiepengerBarn:
        case ApplicationType.pleiepengerLivetsSluttfase:
            return StepID.BESKRIVELSE;
        case ApplicationType.omsorgspenger:
            return StepID.OMS_TYPE;
        default:
            return StepID.DOKUMENTER;
    }
};

const getbackLinkHrefDok = (søknadstype: ApplicationType): string => {
    switch (søknadstype) {
        case ApplicationType.pleiepengerBarn:
        case ApplicationType.pleiepengerLivetsSluttfase:
            return getApplicationPageRoute(søknadstype, StepID.BESKRIVELSE);
        case ApplicationType.omsorgspenger:
            return getApplicationPageRoute(søknadstype, StepID.OMS_TYPE);
        default:
            return getApplicationPageRoute(søknadstype, WELCOME_PAGE);
    }
};

export const getStepConfig = (søknadstype: ApplicationType): StepConfigInterface => {
    let idx = 0;
    let config: StepConfigInterface = {};

    switch (søknadstype) {
        case ApplicationType.pleiepengerBarn:
        case ApplicationType.pleiepengerLivetsSluttfase:
            config[StepID.BESKRIVELSE] = {
                ...getStepConfigItemTextKeys(StepID.BESKRIVELSE),
                index: idx++,
                nextStep: StepID.DOKUMENTER,
                linkHref: getApplicationPageRoute(søknadstype, StepID.BESKRIVELSE),
            };
            break;
        case ApplicationType.omsorgspenger:
            config[StepID.OMS_TYPE] = {
                ...getStepConfigItemTextKeys(StepID.OMS_TYPE),
                index: idx++,
                nextStep: StepID.DOKUMENTER,
                linkHref: getApplicationPageRoute(søknadstype, StepID.OMS_TYPE),
            };
            break;
        default:
            config = {};
    }

    const configFelles = {
        [StepID.DOKUMENTER]: {
            ...getStepConfigItemTextKeys(StepID.DOKUMENTER),
            index: idx++,
            nextStep: StepID.OPPSUMMERING,
            backLinkHref: getbackLinkHrefDok(søknadstype),
            linkHref: getApplicationPageRoute(søknadstype, StepID.DOKUMENTER),
        },
        [StepID.OPPSUMMERING]: {
            ...getStepConfigItemTextKeys(StepID.OPPSUMMERING),
            index: idx++,
            backLinkHref: getApplicationPageRoute(søknadstype, StepID.DOKUMENTER),
            nextButtonLabel: 'step.sendButtonLabel',
            linkHref: getApplicationPageRoute(søknadstype, StepID.OPPSUMMERING),
        },
    };
    config = { ...config, ...configFelles };
    return config;
};

export interface StepConfigProps {
    onValidSubmit: () => void;
    søknadstype: ApplicationType;
}
