import { MellomlagringYtelse } from '../types/mellomlagring';
import {
    hentMellomlagring,
    opprettMellomlagring,
    oppdaterMellomlagring,
    slettMellomlagring,
} from '../api/mellomlagringApi';

/**
 * Generisk mellomlagring utils objekt for å håndtere mellomlagring av state
 * i søknadsapplikasjoner.
 */

export interface MellomlagringConfig {
    /** Ytelse som mellomlagringen gjelder for */
    ytelse: MellomlagringYtelse;
}

export interface MellomlagringUtils<State> {
    /** Henter mellomlagrede data */
    hent: () => Promise<State | null>;
    /** Lagrer data til mellomlagring */
    lagre: (data: State) => Promise<void>;
    /** Oppdaterer eksisterende mellomlagring */
    oppdater: (data: State) => Promise<void>;
    /** Sletter mellomlagrede data */
    slett: () => Promise<void>;
}

/**
 * Oppretter et mellomlagring utils objekt for en spesifikk type data
 *
 * @param config Konfigurasjon for mellomlagring
 * @returns Utils objekt med funksjoner for mellomlagring
 */
export const createMellomlagringUtils = <State>(config: MellomlagringConfig): MellomlagringUtils<State> => {
    const { ytelse } = config;

    return {
        async hent(): Promise<State> {
            const data: string = await hentMellomlagring(ytelse);
            return JSON.parse(data);
        },

        async lagre(data: State): Promise<void> {
            await opprettMellomlagring(ytelse, data as Record<string, unknown>);
        },

        async oppdater(data: State): Promise<void> {
            await oppdaterMellomlagring(ytelse, data as Record<string, unknown>);
        },

        async slett(): Promise<void> {
            await slettMellomlagring(ytelse);
        },
    };
};
