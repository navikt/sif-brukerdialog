import { MellomlagringYtelse } from '../types/mellomlagring';
import {
    hentMellomlagring,
    opprettMellomlagring,
    oppdaterMellomlagring,
    slettMellomlagring,
} from '../api/mellomlagringApi';
import objectHash from 'object-hash';

/**
 * Generisk mellomlagring utils objekt for å håndtere mellomlagring av state
 * i søknadsapplikasjoner.
 */

export interface MellomlagringConfig<State> {
    /** Ytelse som mellomlagringen gjelder for */
    ytelse: MellomlagringYtelse;
    /** Funksjon for å velge ut data som skal brukes til hash-validering */
    dataSelector: (data: State) => unknown;
}

export interface MellomlagringUtils<State> {
    /** Henter mellomlagrede data */
    hent: () => Promise<State | null>;
    /** Lagrer data til mellomlagring med hash */
    lagre: (data: State) => Promise<void>;
    /** Oppdaterer eksisterende mellomlagring med hash */
    oppdater: (data: State) => Promise<void>;
    /** Sletter mellomlagrede data */
    slett: () => Promise<void>;
    /** Sjekker om mellomlagrede data er gyldige ved å sammenligne hash */
    erGyldig: (currentState: State, mellomlagring: State) => boolean;
}

interface MellomlagringWrapper<State> {
    data: State;
    hash: string;
}

/**
 * Oppretter et mellomlagring utils objekt for en spesifikk type data
 *
 * @param config Konfigurasjon for mellomlagring
 * @returns Utils objekt med funksjoner for mellomlagring
 */
export const createMellomlagringUtils = <State>(config: MellomlagringConfig<State>): MellomlagringUtils<State> => {
    const { ytelse, dataSelector } = config;

    const generateHash = (data: unknown): string => {
        return objectHash(data as Record<string, unknown>);
    };

    const createStateObject = (data: State): MellomlagringWrapper<State> => {
        const hashData = dataSelector(data);
        return {
            data,
            hash: generateHash(hashData),
        };
    };

    return {
        async hent(): Promise<State | null> {
            try {
                const rawData: string = await hentMellomlagring(ytelse);
                const wrapper: MellomlagringWrapper<State> = JSON.parse(rawData);
                return wrapper.data;
            } catch {
                return null;
            }
        },

        async lagre(data: State): Promise<void> {
            const wrapper = createStateObject(data);
            await opprettMellomlagring(ytelse, wrapper as unknown as Record<string, unknown>);
        },

        async oppdater(data: State): Promise<void> {
            const wrapper = createStateObject(data);
            await oppdaterMellomlagring(ytelse, wrapper as unknown as Record<string, unknown>);
        },

        async slett(): Promise<void> {
            await slettMellomlagring(ytelse);
        },

        erGyldig(currentState: State, mellomlagring: State): boolean {
            const currentHash = generateHash(dataSelector(currentState));
            const mellomlagringHash = generateHash(dataSelector(mellomlagring));
            return currentHash === mellomlagringHash;
        },
    };
};
