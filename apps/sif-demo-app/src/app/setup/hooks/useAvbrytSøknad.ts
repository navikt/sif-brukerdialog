import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadContext } from '../context/søknadContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';

export const useAvbrytSøknad = () => {
    const navigate = useNavigate();
    const { resetSøknad, clearAllFormValues } = useSøknadContext();
    const { slettMellomlagring } = useSøknadMellomlagring();

    return useCallback(() => {
        resetSøknad();
        clearAllFormValues();
        slettMellomlagring().catch(() => {});
        navigate('/');
    }, [resetSøknad, clearAllFormValues, slettMellomlagring, navigate]);
};
