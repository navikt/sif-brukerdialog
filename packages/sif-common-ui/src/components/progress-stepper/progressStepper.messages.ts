const nb = {
    'progressStepper.showAllStepsLabel': 'Vis alle steg',
    'progressStepper.goToPreviousStepLabel': 'Forrige steg',
    'progressStepper.allStepsSectionAriaLabel': 'Alle steg',
    'progressStepper.navigasjonAriaLabel': 'Navigasjon i søknaden',
    'progressStepper.stegXavY': `Steg {currentStep} av {totalSteps}`,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const progressStepperMessages = {
    nb,
    nn,
};
