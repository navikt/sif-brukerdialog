import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStepFormValues } from '../../rammeverk/state/StepFormValuesContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknad = () => {
    const navigate = useNavigate();
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slettMellomlagring } = useSøknadMellomlagring();
    const { clearAllStepFormValues } = useStepFormValues();

    return useCallback(() => {
        resetSøknad();
        clearAllStepFormValues();
        slettMellomlagring().catch(() => {});
        navigate('/');
    }, [resetSøknad, clearAllStepFormValues, slettMellomlagring, navigate]);
};
