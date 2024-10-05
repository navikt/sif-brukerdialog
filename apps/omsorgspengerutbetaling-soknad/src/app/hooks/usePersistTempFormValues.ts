import { mellomlagringService } from '../api/mellomlagringService';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { TempFormValues } from '../types/SøknadContextState';

export const usePersistTempFormValues = () => {
    const { state } = useSøknadContext();

    const persistTempFormValues = (tempFormData?: TempFormValues) => {
        mellomlagringService.update({ ...state, tempFormData });
    };

    return {
        persistTempFormValues,
    };
};
