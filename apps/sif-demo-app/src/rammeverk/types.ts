/**
 * Generisk mellomlagring-type.
 * Appen bruker denne med sin egen Søknadsdata-type.
 */
export interface Mellomlagring<Søknadsdata> {
    søknadsdata: Søknadsdata;
    currentStepId?: string;
}

/**
 * Definisjon av et steg i søknadsflyten
 */
export interface StepDefinition {
    /** Intern identifikator */
    id: string;
    /** URL-segment */
    route: string;
}

/**
 * Konfigurasjon for alle steg
 */
export type StepConfig = Record<string, StepDefinition>;

/**
 * Info om et aktivt steg
 */
export interface ActiveStep {
    stepId: string;
    isAvailable: boolean;
    isCompleted: boolean;
}

/**
 * Callbacks for å bestemme steg-status.
 * Må leveres av appen siden rammeverket ikke eier søknadsdata.
 */
export interface StepStatusCallbacks {
    /** Returnerer true hvis steget har data og er ferdig utfylt */
    isStepCompleted: (stepId: string) => boolean;
    /** Returnerer true hvis steget skal vises (for dynamiske steg). Default: alltid synlig */
    isStepIncluded?: (stepId: string) => boolean;
}

/**
 * Returnerer liste over aktive steg med tilgjengelighet og fullført-status.
 * Lineær flyt: et steg er tilgjengelig hvis alle foregående er fullført.
 */
export const getActiveStep = (stepOrder: string[], callbacks: StepStatusCallbacks): ActiveStep[] => {
    const includedSteps = stepOrder.filter((id) => {
        return callbacks.isStepIncluded?.(id) ?? true;
    });

    return includedSteps.map((stepId, index) => {
        const isCompleted = callbacks.isStepCompleted(stepId);
        const isAvailable = index === 0 || includedSteps.slice(0, index).every((id) => callbacks.isStepCompleted(id));

        return { stepId, isAvailable, isCompleted };
    });
};
