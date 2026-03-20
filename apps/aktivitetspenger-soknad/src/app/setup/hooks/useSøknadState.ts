import { SøknadState } from '../../types/SøknadState';
import { useSøknadStore } from './useSøknadStore';

export const useSøknadState = (): SøknadState => {
    const søknadState = useSøknadStore((s) => s.søknadState);
    if (!søknadState) {
        throw new Error('useSøknadState brukt før storen er initialisert');
    }
    return søknadState;
};
