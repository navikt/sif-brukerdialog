import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { TempFormValues } from '../types/SøknadContextState';
import { lagreSøknadState } from '../utils/lagreSøknadState';

export const usePersistTempFormValues = () => {
    const { state } = useSøknadContext();

    const persistTempFormValues = (tempFormData?: TempFormValues) => {
        lagreSøknadState({ ...state, tempFormData });
    };

    return {
        persistTempFormValues,
    };
};
