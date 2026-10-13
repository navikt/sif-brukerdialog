export interface StepConfig<STEPS> {
    id: string;
    index: number;
    route: string;
    nextStep?: STEPS;
    nextStepRoute?: string;
    backLinkHref?: string;
    previousStep?: STEPS;
    previousStepRoute?: string;
    previousStepTitleIntlKey?: string;
    stepTitleIntlKey: string;
    nextButtonLabelIntlKey: string;
    previousButtonLabelIntlKey: string;
}

export interface SoknadStepsConfig<STEPS> {
    [key: string]: StepConfig<STEPS>;
}

export enum SoknadApplicationType {
    'SOKNAD' = 'soknad',
    'MELDING' = 'melding',
}
