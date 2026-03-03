import { useCallback } from 'react';

import { useMellomlagring } from './useMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknad = () => {
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slettMellomlagring } = useMellomlagring();

    return useCallback(() => {
        resetSøknad();
        slettMellomlagring().catch(() => {});
    }, [resetSøknad, slettMellomlagring]);
};
