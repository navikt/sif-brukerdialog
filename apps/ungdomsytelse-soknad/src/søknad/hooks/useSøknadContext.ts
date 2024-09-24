import { useContext } from 'react';
import { SøknadContext } from '../context/SøknadContext';

export const useSøknadContext = () => useContext(SøknadContext);
