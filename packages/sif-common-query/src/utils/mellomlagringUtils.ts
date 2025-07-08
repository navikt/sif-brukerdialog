import hash from 'object-hash';
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

export interface MellomlagringConfig<T> {
    /** Ytelse som mellomlagringen gjelder for */
    ytelse: MellomlagringYtelse;
    /** Funksjon for å velge ut data som skal brukes til hash-generering */
    dataSelector: (data: T) => unknown;
}

export interface MellomlagringUtils<T> {
    /** Henter mellomlagrede data */
    hent: () => Promise<T | null>;
    /** Lagrer data til mellomlagring */
    lagre: (data: T) => Promise<void>;
    /** Oppdaterer eksisterende mellomlagring */
    oppdater: (data: T) => Promise<void>;
    /** Sletter mellomlagrede data */
    slett: () => Promise<void>;
    /** Sjekker om mellomlagrede data er gyldige ved sammenligne hash på state data med hash på mellomlagret data */
    erGyldig: (state: T, mellomlagring: unknown) => boolean;
}

/**
 * Oppretter et mellomlagring utils objekt for en spesifikk type data
 *
 * @param config Konfigurasjon for mellomlagring
 * @returns Utils objekt med funksjoner for mellomlagring
 */
export const createMellomlagringUtils = <T>(config: MellomlagringConfig<T>): MellomlagringUtils<T> => {
    const { ytelse, dataSelector } = config;

    const generateHash = (data: unknown): string => {
        return hash(data as Record<string, unknown>);
    };

    return {
        async hent(): Promise<T> {
            const data: string = await hentMellomlagring(ytelse);
            return JSON.parse(data);
        },

        async lagre(data: T): Promise<void> {
            await opprettMellomlagring(ytelse, data as Record<string, unknown>);
        },

        async oppdater(data: T): Promise<void> {
            await oppdaterMellomlagring(ytelse, data as Record<string, unknown>);
        },

        async slett(): Promise<void> {
            await slettMellomlagring(ytelse);
        },

        erGyldig(state: T, mellomlagring: T): boolean {
            const stateData = dataSelector(state);
            const mellomlagringData = dataSelector(mellomlagring);
            return generateHash(stateData) === generateHash(mellomlagringData);
        },
    };
};
