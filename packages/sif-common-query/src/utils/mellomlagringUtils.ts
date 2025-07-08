import objectHash from 'object-hash';
import { hentMellomlagring, oppdaterMellomlagring, slettMellomlagring } from '../api/mellomlagringApi';
import { MellomlagringYtelse } from '../types/mellomlagring';

/**
 * Generisk mellomlagring utils for å håndtere mellomlagring av state
 * med automatisk validering basert på metadata.
 */

export interface MellomlagringConfig<Metadata = unknown> {
    /** Ytelse som mellomlagringen gjelder for */
    ytelse: MellomlagringYtelse;
    /** Metadata som brukes til validering - mellomlagring blir ugyldig hvis metadata endres */
    metadata: Metadata;
}

export interface MellomlagringUtils<State> {
    /** Henter mellomlagrede data - returnerer null hvis ikke gyldig eller ikke finnes */
    hent: () => Promise<State | null>;
    /** Lagrer data til mellomlagring */
    lagre: (data: State) => Promise<void>;
    /** Sletter mellomlagrede data */
    slett: () => Promise<void>;
}

interface MellomlagringWrapper<State> {
    data: State;
    hash: string;
}

/**
 * Oppretter mellomlagring utils med automatisk validering basert på metadata
 */
export const createMellomlagringUtils = <State, Metadata = unknown>(
    config: MellomlagringConfig<Metadata>,
): MellomlagringUtils<State> => {
    const { ytelse, metadata } = config;

    // Pre-beregn hash for metadata - brukes til validering
    const metadataHash = objectHash(metadata as Record<string, unknown>);

    return {
        async hent(): Promise<State | null> {
            try {
                const rawData = await hentMellomlagring(ytelse);
                const wrapper: MellomlagringWrapper<State> = JSON.parse(rawData);

                // Returner data kun hvis metadata-hash matcher
                return wrapper.hash === metadataHash ? wrapper.data : null;
            } catch {
                return null;
            }
        },

        async lagre(data: State): Promise<void> {
            const wrapper: MellomlagringWrapper<State> = {
                data,
                hash: metadataHash,
            };
            await oppdaterMellomlagring(ytelse, wrapper as unknown as Record<string, unknown>);
        },

        async slett(): Promise<void> {
            await slettMellomlagring(ytelse);
        },
    };
};
