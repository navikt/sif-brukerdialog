/**
 * Props som steg-komponenter mottar fra rammeverket
 */
export interface StegProps<TSøknadsdata> {
    søknadsdata: Partial<TSøknadsdata>;
    submitSøknadsdata: (data: Partial<TSøknadsdata>) => void;
}

/**
 * Definisjon av et steg i søknadsflyten
 */
export interface StegDefinisjon<TSøknadsdata> {
    /** Intern identifikator (brukes som key i søknadsdata) */
    id: string;
    /** URL-segment (valgfri, default = id) */
    route?: string;
    /** Visningstekst */
    tittel: string;
    /** Avgjør om steget skal vises i flyten (dynamiske steg). Default: alltid synlig */
    skalVises?: (søknadsdata: Partial<TSøknadsdata>) => boolean;
}

/**
 * Konfigurasjon for alle steg
 */
export type StegConfig<TSøknadsdata> = Record<string, StegDefinisjon<TSøknadsdata>>;

/**
 * Info om et aktivt steg
 */
export interface AktivtSteg {
    stegId: string;
    erTilgjengelig: boolean;
    erFullført: boolean;
}

/**
 * Sjekker om et steg er fullført basert på søknadsdata
 */
export const erStegFullført = <TSøknadsdata>(stegId: string, søknadsdata: Partial<TSøknadsdata>): boolean => {
    return søknadsdata[stegId as keyof TSøknadsdata] !== undefined;
};

/**
 * Returnerer liste over aktive steg med tilgjengelighet og fullført-status.
 * Lineær flyt: et steg er tilgjengelig hvis alle foregående er fullført.
 */
export const getAktiveSteg = <TSøknadsdata>(
    stegRekkefølge: string[],
    stegConfig: StegConfig<TSøknadsdata>,
    søknadsdata: Partial<TSøknadsdata>,
): AktivtSteg[] => {
    const synligeSteg = stegRekkefølge.filter((id) => {
        const steg = stegConfig[id];
        return steg?.skalVises?.(søknadsdata) ?? true;
    });

    return synligeSteg.map((stegId, index) => {
        const erFullført = søknadsdata[stegId as keyof TSøknadsdata] !== undefined;
        const erTilgjengelig =
            index === 0 ||
            synligeSteg.slice(0, index).every((id) => søknadsdata[id as keyof TSøknadsdata] !== undefined);

        return { stegId, erTilgjengelig, erFullført };
    });
};
