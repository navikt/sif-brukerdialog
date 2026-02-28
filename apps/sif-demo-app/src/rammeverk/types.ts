/**
 * Props som steg-komponenter mottar fra rammeverket
 */
export interface StegProps<TSkjemadata> {
    initialData: TSkjemadata;
    onSkjemadataChange: (data: TSkjemadata) => void;
    onStegSubmit: (data: TSkjemadata) => void;
}

/**
 * Definisjon av et steg i søknadsflyten
 */
export interface StegDefinisjon<TSøknadsdata, TSkjemadata = unknown> {
    /** Intern identifikator */
    id: string;
    /** URL-segment (valgfri, default = id) */
    route?: string;
    /** Visningstekst */
    tittel: string;
    /** Avgjør om steget vises i flyten basert på søknadsdata */
    erTilgjengelig: (søknadsdata: Partial<TSøknadsdata>) => boolean;
    /** Transformerer søknadsdata → skjemadata (ved navigering tilbake) */
    toSkjemadata: (søknadsdata: Partial<TSøknadsdata>) => TSkjemadata;
    /** Transformerer skjemadata → søknadsdata (ved submit) */
    toSøknadsdata: (skjemadata: TSkjemadata) => Partial<TSøknadsdata>;
}

/**
 * Konfigurasjon for alle steg
 */
export type StegConfig<TSøknadsdata> = Record<string, StegDefinisjon<TSøknadsdata, unknown>>;
