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
 * Info om et inkludert steg
 */
export interface IncludedStep {
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
