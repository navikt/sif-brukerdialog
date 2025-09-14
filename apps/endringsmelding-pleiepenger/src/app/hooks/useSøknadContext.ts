import { useContext } from 'react';

import { SøknadContext } from '../søknad/context/SøknadContext';

export const useSøknadContext = () => useContext(SøknadContext);
