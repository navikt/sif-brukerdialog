import { SøknadState } from '@app/types/SoknadState';

import { useSøknadStore } from './useSoknadStore';

export const useSøknadState = (): SøknadState => {
    const søknadState = useSøknadStore((s) => s.søknadState);
    if (!søknadState) {
        throw new Error('useSøknadState brukt før storen er initialisert');
    }
    return søknadState;
};
