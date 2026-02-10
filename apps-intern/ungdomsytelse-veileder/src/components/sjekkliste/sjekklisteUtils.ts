export type JaNei = 'ja' | 'nei';

/** Hvert spørsmål i sjekklisten har et riktig svar for å kunne meldes inn */
export interface Spørsmål {
    id: string;
    riktigSvar: JaNei;
}

/** Definerer alle spørsmålene i rekkefølge med forventet riktig svar */
export const spørsmål: Spørsmål[] = [
    { id: 'tilhørerKontor', riktigSvar: 'ja' },
    { id: 'mottarAndreLivsoppholdsytelser', riktigSvar: 'nei' },
    { id: 'alderBistandOgDeltakelse', riktigSvar: 'ja' },
    { id: 'ønskerÅDelta', riktigSvar: 'ja' },
    { id: 'erIStandTilÅDelta', riktigSvar: 'ja' },
];

export type SjekklisteValues = Partial<Record<string, JaNei>>;

export interface SjekklisteStatus {
    /** Indekser for spørsmål som skal vises */
    synligeSpørsmål: number[];
    /** Indeks for første feil-svar (undefined hvis ingen feil) */
    førsteFeilIndex: number | undefined;
    /** Om alle synlige spørsmål er besvart */
    alleBesvart: boolean;
    /** Om deltaker kan meldes inn */
    kanMeldesInn: boolean;
}

/**
 * Beregner status for sjekklisten basert på svarene.
 * - Viser alltid spørsmål 0
 * - Viser påfølgende spørsmål kun hvis forrige har riktig svar
 * - Stopper ved første feil-svar
 */
export const getSjekklisteStatus = (values: SjekklisteValues): SjekklisteStatus => {
    const synligeSpørsmål: number[] = [0]; // Første spørsmål vises alltid
    let førsteFeilIndex: number | undefined;
    let alleBesvart = false;

    for (let i = 0; i < spørsmål.length; i++) {
        const sp = spørsmål[i];
        const svar = values[sp.id];

        if (svar === undefined) {
            // Ikke besvart enda - stopp her
            break;
        }

        if (svar !== sp.riktigSvar) {
            // Feil svar - registrer feil, marker som besvart og stopp
            førsteFeilIndex = i;
            alleBesvart = true;
            break;
        }

        // Riktig svar - vis neste spørsmål hvis det finnes
        if (i + 1 < spørsmål.length) {
            synligeSpørsmål.push(i + 1);
        }

        // Hvis vi har besvart siste spørsmål riktig
        if (i === spørsmål.length - 1) {
            alleBesvart = true;
        }
    }

    const kanMeldesInn = alleBesvart && førsteFeilIndex === undefined;

    return {
        synligeSpørsmål,
        førsteFeilIndex,
        alleBesvart,
        kanMeldesInn,
    };
};
