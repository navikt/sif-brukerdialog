export type StepFormValues = Record<string, unknown>;

export type SøknadFormValues = Record<string, StepFormValues | undefined>;

export type StepSøknadsdata = Record<string, unknown>;

/**
 * Generisk mellomlagring-type.
 * Appen bruker denne med sin egen Søknadsdata-type.
 */
export interface Mellomlagring<Søknadsdata, Skjemadata> {
    søknadsdata: Søknadsdata;
    skjemadata?: Skjemadata;
    currentStepId?: string;
}

/**
 * Definisjon av et steg i søknadsflyten
 */
export interface StepDefinition<TSøknadsdata = StepSøknadsdata> {
    /** Intern identifikator */
    id: string;
    /** URL-segment */
    route: string;
    /** Returnerer true hvis steget er ferdig utfylt */
    isCompleted?: (søknadsdata: TSøknadsdata) => boolean;
    /** Returnerer true hvis steget skal vises (for dynamiske steg). Default: alltid synlig */
    isIncluded?: (søknadsdata: TSøknadsdata) => boolean;
}

/**
 * Konfigurasjon for alle steg
 */
export type StepConfig<TSøknadsdata = unknown> = Record<string, StepDefinition<TSøknadsdata>>;

/**
 * Info om et inkludert steg
 */
export interface IncludedStep {
    stepId: string;
    stepRoute: string;
    completed: boolean;
}
