import { useCallback } from 'react';

import { useMellomlagring } from './useMellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknadHandler = () => {
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slettMellomlagring } = useMellomlagring();

    const avbrytHandler = useCallback(() => {
        resetSøknad();
        slettMellomlagring().catch(() => {});
    }, [resetSøknad, slettMellomlagring]);

    return { avbrytHandler };
};
