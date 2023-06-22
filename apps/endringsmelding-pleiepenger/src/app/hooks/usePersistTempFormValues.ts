import { TempFormValues } from '../types';
import { lagreSøknadState } from '../utils/lagreSøknadState';
import { useSøknadContext } from './useSøknadContext';

export const usePersistTempFormValues = () => {
    const { state } = useSøknadContext();

    const persistTempFormValues = (tempFormValues: TempFormValues) => {
        lagreSøknadState({ ...state, tempFormValues });
    };

    return {
        persistTempFormValues,
    };
};
