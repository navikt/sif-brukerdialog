import { useSøknadContext } from '@app/setup';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
