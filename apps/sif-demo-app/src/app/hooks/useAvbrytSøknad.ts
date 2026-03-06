import { useSøknadFormValues } from '@rammeverk/state/SøknadFormValuesContext';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadMellomlagring } from './useSøknadMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknad = () => {
    const navigate = useNavigate();
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slettMellomlagring } = useSøknadMellomlagring();
    const { clearSøknadFormValues } = useSøknadFormValues();

    return useCallback(() => {
        resetSøknad();
        clearSøknadFormValues();
        slettMellomlagring().catch(() => {});
        navigate('/');
    }, [resetSøknad, clearSøknadFormValues, slettMellomlagring, navigate]);
};
