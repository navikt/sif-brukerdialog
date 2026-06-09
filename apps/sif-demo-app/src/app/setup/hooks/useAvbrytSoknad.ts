import { useSøknadFormValues } from '@sif/soknad/consistency';
import { useCallback } from 'react';

import { useSøknadsflyt } from '../context/soknadContext';
import { useSøknadMellomlagring } from './useSoknadMellomlagring';

export const useAvbrytSøknad = () => {
    const { resetSøknad } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();

    return useCallback(async () => {
        await slettMellomlagring().catch(() => {});
        resetSøknad();
        clearSøknadFormValues();
    }, [resetSøknad, clearSøknadFormValues, slettMellomlagring]);
};
