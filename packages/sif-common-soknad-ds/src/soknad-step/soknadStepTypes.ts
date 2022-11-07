export interface StepConfig<STEPS, SøknadRoutes = string> {
    id: string;
    index: number;
    route: string;
    nextStep?: STEPS;
    nextStepRoute?: SøknadRoutes;
    backLinkHref?: string;
    previousStep?: STEPS;
    previousStepRoute?: SøknadRoutes;
    previousStepTitleIntlKey?: string;
    pageTitleIntlKey: string;
    stepTitleIntlKey: string;
    nextButtonLabelIntlKey: string;
}

export interface SoknadStepsConfig<STEPS, SøknadRoutes = string> {
    [key: string]: StepConfig<STEPS, SøknadRoutes>;
}

export enum SoknadApplicationType {
    'SOKNAD' = 'soknad',
    'MELDING' = 'melding',
}
