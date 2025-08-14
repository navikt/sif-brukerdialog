import { jsonSort } from '@navikt/sif-common-utils';
import objectHash from 'object-hash';
import {
    hentYtelseMellomlagring,
    oppdaterYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '../api/ytelseMellomlagringApi';
import { MellomlagringYtelse } from '../types/MellomlagringYtelse';

/**
 * Mellomlagring av state med gyldighetssjekk basert på metadata. Mellomlagring blir ugyldig hvis metadata endres siden lagring.
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
    søknadsdata: State;
    søknadHashString: string;
}

/**
 * Returnerer mellomlagring-funksjoner for en ytelse med gyldighetsvalidering
 */
export const ytelseMellomlagringUtils = <State, MetaData = unknown>(
    ytelse: MellomlagringYtelse,
): YtelseMellomlagringUtils<State, MetaData> => {
    const isValidMellomlagringWrapper = (wrapper: unknown): wrapper is YtelseMellomlagringWrapper<State> => {
        if (typeof wrapper !== 'object' || wrapper === null) {
            return false;
        }
        const castedWrapper = wrapper as YtelseMellomlagringWrapper<State>;
        if (!castedWrapper.søknadsdata || typeof castedWrapper.søknadHashString !== 'string') {
            return false;
        }
        return true;
    };

    const createHash = (metaData: MetaData): string => {
        return objectHash(jsonSort(metaData));
    };

    return {
        async hent(metaData: MetaData): Promise<State | null> {
            try {
                const wrapper = await hentYtelseMellomlagring(ytelse);
                if (isValidMellomlagringWrapper(wrapper)) {
                    const metadataHash = createHash(metaData);
                    const erGyldig = wrapper.søknadHashString === metadataHash;
                    if (!erGyldig) {
                        await slettYtelseMellomlagring(ytelse);
                        return null;
                    }
                    return wrapper.søknadsdata;
                } else {
                    return null;
                }
            } catch {
                await slettYtelseMellomlagring(ytelse);
                return null;
            }
        },

        async lagre(data: State, metaData: MetaData): Promise<void> {
            const wrapper: YtelseMellomlagringWrapper<State> = {
                søknadsdata: data,
                søknadHashString: createHash(metaData),
            };
            await oppdaterYtelseMellomlagring(ytelse, wrapper as unknown as Record<string, unknown>);
        },

        async slett(): Promise<void> {
            await slettYtelseMellomlagring(ytelse);
        },
    };
};
