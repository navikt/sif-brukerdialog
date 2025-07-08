import { createMellomlagringUtils, MellomlagringYtelse } from '@navikt/sif-common-query';
import { SøknadContextState } from '../types/SøknadContextState';

// export type MellomlagringFormat = Omit<SøknadContextState, 'søker'> & {
//     søknadHashString: string;
// };

export const mellomlagringUtils = createMellomlagringUtils({
    ytelse: MellomlagringYtelse.OMSORGSPENGER_UTVIDET_RETT,
    hashDataSelector: (state: SøknadContextState) => {
        return { søker: state.søker };
    },
});
