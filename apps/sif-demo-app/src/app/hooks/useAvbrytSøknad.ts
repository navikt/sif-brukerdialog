import { useCallback } from 'react';

import { useSøknadMellomlagring } from './useSøknadMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknad = () => {
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slettMellomlagring } = useSøknadMellomlagring();

    return useCallback(() => {
        resetSøknad();
        slettMellomlagring().catch(() => {});
    }, [resetSøknad, slettMellomlagring]);
};
