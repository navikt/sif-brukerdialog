import { useContext } from 'react';

import { SøknadContext } from '../../søknad/context/SøknadContext';

export const useSøknadContext = () => {
    const context = useContext(SøknadContext);
    if (!context) {
        throw new Error('useSøknadContext må brukes innenfor en SkjemaProvider');
    }
    return context;
};
