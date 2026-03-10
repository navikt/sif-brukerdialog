import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadContext } from '../context/søknadContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknad = () => {
    const navigate = useNavigate();
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slettMellomlagring } = useSøknadMellomlagring();
    const { clearAllFormValues } = useSøknadContext();

    return useCallback(() => {
        resetSøknad();
        clearAllFormValues();
        slettMellomlagring().catch(() => {});
        navigate('/');
    }, [resetSøknad, clearAllFormValues, slettMellomlagring, navigate]);
};
