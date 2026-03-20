import { useSøknadFormValues } from '@sif/soknad/consistency';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadFlow } from '../context/søknadContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';

export const useAvbrytSøknad = () => {
    const navigate = useNavigate();
    const { resetSøknad } = useSøknadFlow();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();

    return useCallback(() => {
        resetSøknad();
        clearSøknadFormValues();
        slettMellomlagring().catch(() => {});
        navigate('/');
    }, [resetSøknad, clearSøknadFormValues, slettMellomlagring, navigate]);
};
