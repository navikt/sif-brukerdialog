import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadMellomlagring } from './useSøknadMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknad = () => {
    const navigate = useNavigate();
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slettMellomlagring } = useSøknadMellomlagring();

    return useCallback(() => {
        resetSøknad();
        slettMellomlagring().catch(() => {});
        navigate('/');
    }, [resetSøknad, slettMellomlagring, navigate]);
};
