import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadContextAction } from '../action/actionCreator';

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    return { ...state };
};
