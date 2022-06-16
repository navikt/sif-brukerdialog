export interface StepConfig<STEPS> {
    id: string;
    index: number;
    route: string;
    nextStep?: STEPS;
    nextStepRoute?: string;
    backLinkHref?: string;
    previousStepTitleIntlKey?: string;
    pageTitleIntlKey: string;
    stepTitleIntlKey: string;
    nextButtonLabelIntlKey: string;
}

export interface SoknadStepsConfig<STEPS> {
    [key: string]: StepConfig<STEPS>;
}

export enum SoknadApplicationType {
    'SOKNAD' = 'soknad',
    'MELDING' = 'melding',
}
