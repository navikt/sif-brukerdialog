import { useSøknadFormValues } from '@sif/soknad/consistency';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadsflyt } from '../context/soknadContext';
import { useSøknadMellomlagring } from './useSoknadMellomlagring';

export const useAvbrytSøknad = () => {
    const navigate = useNavigate();
    const { resetSøknad } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();

    return useCallback(() => {
        resetSøknad();
        clearSøknadFormValues();
        slettMellomlagring().catch(() => {});
        navigate('/');
    }, [resetSøknad, clearSøknadFormValues, slettMellomlagring, navigate]);
};
