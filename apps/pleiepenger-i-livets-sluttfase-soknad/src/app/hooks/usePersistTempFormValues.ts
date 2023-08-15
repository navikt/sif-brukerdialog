import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { lagreSøknadState } from '../utils/lagreSøknadState';

export const usePersistTempFormValues = () => {
    const { state } = useSøknadContext();

    const persistTempFormValues = () => {
        lagreSøknadState({ ...state });
    };

    return {
        persistTempFormValues,
    };
};
