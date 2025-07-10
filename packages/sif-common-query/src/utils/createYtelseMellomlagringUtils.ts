import objectHash from 'object-hash';
import {
    hentYtelseMellomlagring,
    oppdaterYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '../api/ytelseMellomlagringApi';
import { MellomlagringYtelse } from '../types/mellomlagring';
import { jsonSort } from '@navikt/sif-common-utils';

/**
 * Mellomlagring av state med gyldighetssjekk basert på metadata.
 * Mellomlagring blir ugyldig hvis metadata endres siden lagring.
 */

interface YtelseMellomlagringUtils<State, Metadata = unknown> {
    /** Henter mellomlagrede data - returnerer null hvis metadata har endret seg siden lagring */
    hent: (metadata: Metadata) => Promise<State | null>;
    /** Lagrer data til mellomlagring sammen med metadata-hash for senere validering */
    lagre: (data: State, metadata: Metadata) => Promise<void>;
    /** Sletter mellomlagrede data */
    slett: () => Promise<void>;
}

interface YtelseMellomlagringWrapper<State> {
    data: State;
    hash: string;
}

/**
 * Returnerer mellomlagring-funksjoner for en ytelse med gyldighetsvalidering
 */
export const createYtelseMellomlagringUtils = <State, MetaData = unknown>(
    ytelse: MellomlagringYtelse,
): YtelseMellomlagringUtils<State, MetaData> => {
    const isValidMellomlagringWrapper = (wrapper: unknown): wrapper is YtelseMellomlagringWrapper<State> => {
        if (typeof wrapper !== 'object' || wrapper === null) {
            return false;
        }
        const castedWrapper = wrapper as YtelseMellomlagringWrapper<State>;
        return 'data' in castedWrapper && 'hash' in castedWrapper && typeof castedWrapper.hash === 'string';
    };

    const createHash = (metaData: MetaData): string => {
        return objectHash(jsonSort(metaData));
    };

    return {
        async hent(metaData: MetaData): Promise<State | null> {
            try {
                const wrapper = await hentYtelseMellomlagring(ytelse);
                if (isValidMellomlagringWrapper(wrapper)) {
                    const erGyldig = wrapper.hash === createHash(metaData);
                    if (!erGyldig) {
                        await slettYtelseMellomlagring(ytelse);
                        return null;
                    }
                    return wrapper.data;
                } else {
                    return null;
                }
            } catch (e) {
                await slettYtelseMellomlagring(ytelse);
                return null;
            }
        },

        async lagre(data: State, metaData: MetaData): Promise<void> {
            const wrapper: YtelseMellomlagringWrapper<State> = {
                data,
                hash: createHash(metaData),
            };
            await oppdaterYtelseMellomlagring(ytelse, wrapper as unknown as Record<string, unknown>);
        },

        async slett(): Promise<void> {
            await slettYtelseMellomlagring(ytelse);
        },
    };
};
