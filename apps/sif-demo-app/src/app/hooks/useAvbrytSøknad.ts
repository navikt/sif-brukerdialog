import { useCallback } from 'react';

import { useLagreSøknad } from './useLagreSøknad';
import { useSøknadStore } from './useSøknadStore';

export const useAvbrytSøknad = () => {
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slett } = useLagreSøknad();

    return useCallback(() => {
        resetSøknad();
        slett().catch(() => {});
    }, [resetSøknad, slett]);
};
