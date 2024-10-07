import { mellomlagringService } from '../api/mellomlagringService';
import { SøknadContextState } from '../types/SøknadContextState';

export const lagreSøknadState = (state: SøknadContextState) => {
    return mellomlagringService.update(state);
};
