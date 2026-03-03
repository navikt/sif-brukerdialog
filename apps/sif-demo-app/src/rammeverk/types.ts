/**
 * Generisk mellomlagring-type.
 * Appen bruker denne med sin egen Søknadsdata-type.
 */
export interface Mellomlagring<Søknadsdata> {
    søknadsdata: Søknadsdata;
    currentStegId?: string;
}

/**
 * Definisjon av et steg i søknadsflyten
 */
export interface StegDefinisjon {
    /** Intern identifikator */
    id: string;
    /** URL-segment */
    route: string;
}

/**
 * Konfigurasjon for alle steg
 */
export type StegConfig = Record<string, StegDefinisjon>;

/**
 * Info om et aktivt steg
 */
export interface AktivtSteg {
    stegId: string;
    erTilgjengelig: boolean;
    erFullført: boolean;
}

/**
 * Callbacks for å bestemme steg-status.
 * Må leveres av appen siden rammeverket ikke eier søknadsdata.
 */
export interface StegStatusCallbacks {
    /** Returnerer true hvis steget har data og er ferdig utfylt */
    erFullført: (stegId: string) => boolean;
    /** Returnerer true hvis steget skal vises (for dynamiske steg). Default: alltid synlig */
    skalVises?: (stegId: string) => boolean;
}

/**
 * Returnerer liste over aktive steg med tilgjengelighet og fullført-status.
 * Lineær flyt: et steg er tilgjengelig hvis alle foregående er fullført.
 */
export const getAktiveSteg = (stegRekkefølge: string[], callbacks: StegStatusCallbacks): AktivtSteg[] => {
    const synligeSteg = stegRekkefølge.filter((id) => {
        return callbacks.skalVises?.(id) ?? true;
    });

    return synligeSteg.map((stegId, index) => {
        const erFullført = callbacks.erFullført(stegId);
        const erTilgjengelig = index === 0 || synligeSteg.slice(0, index).every((id) => callbacks.erFullført(id));

        return { stegId, erTilgjengelig, erFullført };
    });
};
