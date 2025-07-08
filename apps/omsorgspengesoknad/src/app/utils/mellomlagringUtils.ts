import { createMellomlagringUtils, MellomlagringYtelse } from '@navikt/sif-common-query';
import { SøknadContextState } from '../types/SøknadContextState';

export type MellomlagringFormat = Omit<SøknadContextState, 'søker'> & {
    søknadHashString: string;
};

export const mellomlagringUtils = createMellomlagringUtils({
    ytelse: MellomlagringYtelse.OMSORGSPENGER_UTVIDET_RETT,
    validator: (data: any): data is any => {
        return false;
    },
});
