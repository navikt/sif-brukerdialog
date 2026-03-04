import { useCallback } from 'react';

import { useSøknadMellomlagring } from './useSøknadMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknad = () => {
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slett } = useSøknadMellomlagring();

    return useCallback(() => {
        resetSøknad();
        slett().catch(() => {});
    }, [resetSøknad, slett]);
};
